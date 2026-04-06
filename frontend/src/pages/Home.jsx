import { Link } from "react-router-dom"
import "./Pages.css"

function Home() {
  return (
    <div className="page home-page">
      <section className="border-b-4 border-[var(--primary-gold)] bg-gradient-to-br from-[var(--primary-green)] to-[var(--dark-green)] px-4 py-12 text-[var(--white)] sm:py-16">
        <div className="container max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-gold)] sm:text-sm">
            Jones County High School
          </p>
          <h1 className="mb-6 font-heading text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Welcome to Jones County Cross Country — Home of the Greyhounds
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--white)]/90 sm:text-lg">
            We&apos;re glad you&apos;re here. Follow the team&apos;s schedule, roster, and race
            results as our student-athletes train hard, race with heart, and represent Jones
            County on courses across Georgia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center rounded-md bg-[var(--primary-gold)] px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--primary-green)] shadow-md transition hover:brightness-95"
            >
              View schedule
            </Link>
            <Link
              to="/roster"
              className="inline-flex items-center justify-center rounded-md border-2 border-[var(--white)] px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--white)] transition hover:bg-[var(--white)] hover:text-[var(--primary-green)]"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Greyhound cross country</h2>
          <div className="intro-grid">
            <div className="intro-card">
              <div className="intro-icon">🏃</div>
              <h3>Excellence in athletics</h3>
              <p>
                Our program develops well-rounded student-athletes who aim high on the course
                and in the classroom.
              </p>
            </div>
            <div className="intro-card">
              <div className="intro-icon">🏆</div>
              <h3>Competitive spirit</h3>
              <p>
                From invitationals to postseason meets, we race with pride and support one
                another every step of the way.
              </p>
            </div>
            <div className="intro-card">
              <div className="intro-icon">🤝</div>
              <h3>Team first</h3>
              <p>
                Every runner matters. Whether you&apos;re chasing a PR or cheering from the
                sideline, you&apos;re part of the pack.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Upcoming events</h2>
          <div className="events-preview">
            <div className="event-card">
              <div className="event-date">
                <span className="month">SEP</span>
                <span className="day">14</span>
              </div>
              <div className="event-info">
                <h4>Region preview meet</h4>
                <p>Veterans State Park — 8:00 AM</p>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">SEP</span>
                <span className="day">21</span>
              </div>
              <div className="event-info">
                <h4>Jones County Invitational</h4>
                <p>Home course — 9:00 AM</p>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">OCT</span>
                <span className="day">05</span>
              </div>
              <div className="event-info">
                <h4>Peach State Classic</h4>
                <p>Carrollton, GA — 7:30 AM</p>
              </div>
            </div>
          </div>
          <div className="mt-30 text-center">
            <Link to="/schedule" className="btn btn-primary">
              Full schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
