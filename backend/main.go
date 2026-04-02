package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Athlete struct {
	AthleteID          int    `json:"athlete_id"`
	Name               string `json:"name"`
	Grade              int    `json:"grade"`
	PersonalRecordTime string `json:"personal_record_time"`
}

type Meet struct {
	MeetID    int    `json:"meet_id"`
	Name      string `json:"name"`
	MeetDate  string `json:"meet_date"`
	Location  string `json:"location"`
}

type ResultWithNames struct {
	ResultID     int    `json:"result_id"`
	AthleteID    int    `json:"athlete_id"`
	AthleteName  string `json:"athlete_name"`
	MeetID       int    `json:"meet_id"`
	MeetName     string `json:"meet_name"`
	FinishTime   string `json:"finish_time"`
	Place        int    `json:"place"`
}

type createAthleteRequest struct {
	Name               string `json:"name" binding:"required"`
	Grade              int    `json:"grade" binding:"required"`
	PersonalRecordTime string `json:"personal_record_time" binding:"required"`
}

func getEnvOrError(key string) (string, error) {
	value := os.Getenv(key)
	if value == "" {
		return "", fmt.Errorf("missing required environment variable %s", key)
	}
	return value, nil
}

func openDatabase() (*sql.DB, error) {
	dbUser, err := getEnvOrError("DB_USER")
	if err != nil {
		return nil, err
	}
	dbPassword, err := getEnvOrError("DB_PASSWORD")
	if err != nil {
		return nil, err
	}
	dbName, err := getEnvOrError("DB_NAME")
	if err != nil {
		return nil, err
	}
	dbHost, err := getEnvOrError("DB_HOST")
	if err != nil {
		return nil, err
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}

func healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func getAthletesHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := db.Query("SELECT athlete_id, name, grade, personal_record_time FROM athletes ORDER BY athlete_id")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		athletes := make([]Athlete, 0)
		for rows.Next() {
			var a Athlete
			if err := rows.Scan(&a.AthleteID, &a.Name, &a.Grade, &a.PersonalRecordTime); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			athletes = append(athletes, a)
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, athletes)
	}
}

func getMeetsHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := db.Query("SELECT meet_id, name, meet_date, location FROM meets ORDER BY meet_date")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		meets := make([]Meet, 0)
		for rows.Next() {
			var m Meet
			if err := rows.Scan(&m.MeetID, &m.Name, &m.MeetDate, &m.Location); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			meets = append(meets, m)
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, meets)
	}
}

func getResultsHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		query := `
			SELECT
				r.result_id,
				r.athlete_id,
				a.name AS athlete_name,
				r.meet_id,
				m.name AS meet_name,
				r.finish_time,
				r.place
			FROM results r
			JOIN athletes a ON a.athlete_id = r.athlete_id
			JOIN meets m ON m.meet_id = r.meet_id
			ORDER BY m.meet_date, r.place
		`

		rows, err := db.Query(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		results := make([]ResultWithNames, 0)
		for rows.Next() {
			var r ResultWithNames
			if err := rows.Scan(
				&r.ResultID,
				&r.AthleteID,
				&r.AthleteName,
				&r.MeetID,
				&r.MeetName,
				&r.FinishTime,
				&r.Place,
			); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			results = append(results, r)
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, results)
	}
}

func createAthleteHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createAthleteRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if req.Grade < 9 || req.Grade > 12 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "grade must be between 9 and 12"})
			return
		}

		result, err := db.Exec(
			"INSERT INTO athletes (name, grade, personal_record_time) VALUES (?, ?, ?)",
			req.Name,
			req.Grade,
			req.PersonalRecordTime,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		newID, err := result.LastInsertId()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"athlete_id": newID,
			"name": req.Name,
			"grade": req.Grade,
			"personal_record_time": req.PersonalRecordTime,
		})
	}
}

func deleteAthleteHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		athleteIDParam := c.Param("id")
		athleteID, err := strconv.Atoi(athleteIDParam)
		if err != nil || athleteID <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid athlete id"})
			return
		}

		result, err := db.Exec("DELETE FROM athletes WHERE athlete_id = ?", athleteID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		affected, err := result.RowsAffected()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if affected == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "athlete not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "athlete deleted"})
	}
}

func main() {
	db, err := openDatabase()
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if closeErr := db.Close(); closeErr != nil && !errors.Is(closeErr, sql.ErrConnDone) {
			log.Printf("error closing database: %v", closeErr)
		}
	}()

	router := gin.Default()

	router.GET("/health", healthHandler)
	router.GET("/api/athletes", getAthletesHandler(db))
	router.GET("/api/meets", getMeetsHandler(db))
	router.GET("/api/results", getResultsHandler(db))
	router.POST("/api/athletes", createAthleteHandler(db))
	router.DELETE("/api/athletes/:id", deleteAthleteHandler(db))

	log.Println("Backend server starting on :8080")
	log.Println("Health endpoint: http://localhost:8080/health")

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
