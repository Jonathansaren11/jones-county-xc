# Jones County Cross Country Website

A full-stack web application for the Jones County Cross Country team featuring a React frontend and Go backend.

## Project Structure

```
jones-county-xc/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/   # Header, Footer components
│   │   ├── pages/        # Home, Schedule, Results, Roster, Contact
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/           # Go application
│   ├── main.go
│   └── go.mod
└── README.md
```

## Features

- **Home**: Hero section with team branding and upcoming events
- **Schedule**: Full season schedule with dates, events, and locations
- **Results**: Race results with team placements and top performers
- **Roster**: Team roster with coaches and athlete information
- **Contact**: Contact information and message form

## Prerequisites

- Node.js 18+ and npm
- Go 1.21+

## Running Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend

```bash
cd backend
go run main.go
```

The backend will be available at http://localhost:8080

### Verify Backend

```bash
curl http://localhost:8080/health
# Returns: {"status":"ok"}
```

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Go (standard library)
- **Styling**: Custom CSS with CSS variables

## Color Scheme

- Primary Green: #1B5E20
- Primary Gold: #FFD700
- Dark Green: #0D3311

## License

All rights reserved - Jones County Cross Country
