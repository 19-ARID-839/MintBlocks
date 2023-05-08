import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-section">
        <h1>Contact Us Page</h1>
        <p>Do you have any questions?</p>
        <p>Just send us a message and we will get back to you</p>
      </div>
      <div class="container">
        <div>

        </div>
        <div class="contact-row">
          <div class="contact-column">
            <img src="https://preachnthegospel.files.wordpress.com/2019/01/questions.jpg" height="400px" alt="map" />
          </div>
          <div class="contact-column">
            <form className="contact-page-form">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.." />
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
              {/* <label for="country">Country</label>
        <select id="country" name="country">
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select> */}
              <label for="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" />
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Write something.." ></textarea>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
      <div className="embeded-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1660.63572751083!2d73.07903012566814!3d33.650127545155634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df952e017d0acd%3A0xf20be4a76782ceaf!2sPir%20Mehr%20Ali%20Shah%20Arid%20Agriculture%20University%20-%20PMAS%20AAUR!5e0!3m2!1sen!2sus!4v1666956975991!5m2!1sen!2sus" width="100%" height="600" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
    </div>
  )
}

export default Contact
