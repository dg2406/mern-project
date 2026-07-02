import React from "react";
import Layout from "../components/layout";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import "./Contact.css";

const Contact = () => {
  return (
    <Layout title={"Contact - Ecommerce App"}>
      <div className="contact-page">
        <div className="contact-container">
          {/* Left Image */}
          <div className="contact-image">
            <img src="contact.jpeg" alt="Customer Support" />
          </div>

          {/* Right Content */}
          <div className="contact-content">
            <h1>Contact Us</h1>

            <p className="contact-desc">
              Have questions about our products or services? Feel free to
              reach out to us anytime. Our support team is available 24×7.
            </p>

            <div className="contact-card">
              <EmailIcon className="contact-icon" />
              <span>help@ecommerceapp.com</span>
            </div>

            <div className="contact-card">
              <ContactPhoneIcon className="contact-icon" />
              <span>+91 012-3456789</span>
            </div>

            <div className="contact-card">
              <PhoneIcon className="contact-icon" />
              <span>1800-0000-0000</span>
            </div>

            <button className="contact-btn">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;