import './Pages.css'

function Contact() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Jones County Cross Country</p>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p className="contact-intro">
                Have questions about our program? Interested in joining the team? 
                We'd love to hear from you!
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>Jones County High School</p>
                    <p>123 Greyhound Way</p>
                    <p>Gray, GA 31032</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>crosscountry@jonescountyschools.org</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>(478) 555-0123</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">⏰</div>
                  <div>
                    <h4>Practice Times</h4>
                    <p>Monday - Friday: 6:30 AM & 3:30 PM</p>
                    <p>Saturday: 7:00 AM (during season)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
