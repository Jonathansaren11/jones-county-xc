import './Pages.css'

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Jones County Cross Country</h1>
          <p className="hero-subtitle">Building Champions Since 1985</p>
          <div className="hero-cta">
            <a href="/schedule" className="btn btn-primary">View Schedule</a>
            <a href="/roster" className="btn btn-secondary">Meet the Team</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Welcome to Greyhound Cross Country</h2>
          <div className="intro-grid">
            <div className="intro-card">
              <div className="intro-icon">🏃</div>
              <h3>Excellence in Athletics</h3>
              <p>Our program focuses on developing well-rounded student-athletes who excel both on the course and in the classroom.</p>
            </div>
            <div className="intro-card">
              <div className="intro-icon">🏆</div>
              <h3>Winning Tradition</h3>
              <p>Multiple region championships and state qualifiers. Our athletes consistently compete at the highest levels.</p>
            </div>
            <div className="intro-card">
              <div className="intro-icon">🤝</div>
              <h3>Team First</h3>
              <p>We believe in the power of teamwork. Every runner contributes to our success, from varsity to JV.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-preview">
            <div className="event-card">
              <div className="event-date">
                <span className="month">SEP</span>
                <span className="day">14</span>
              </div>
              <div className="event-info">
                <h4>Region Preview Meet</h4>
                <p>Veterans State Park - 8:00 AM</p>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">SEP</span>
                <span className="day">21</span>
              </div>
              <div className="event-info">
                <h4>Jones County Invitational</h4>
                <p>Home Course - 9:00 AM</p>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">OCT</span>
                <span className="day">05</span>
              </div>
              <div className="event-info">
                <h4>Peach State Classic</h4>
                <p>Carrollton, GA - 7:30 AM</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-30">
            <a href="/schedule" className="btn btn-primary">Full Schedule</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
