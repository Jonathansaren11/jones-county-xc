import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">JC</div>
            <div>
              <h3>Jones County Cross Country</h3>
              <p>Building champions on and off the course</p>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/schedule">Schedule</a></li>
              <li><a href="/results">Results</a></li>
              <li><a href="/roster">Roster</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Jones County High School</p>
            <p>123 Greyhound Way</p>
            <p>Gray, GA 31032</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jones County Cross Country. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
