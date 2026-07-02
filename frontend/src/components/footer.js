import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Footer.css";


const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h4>Customer Service</h4>
        <ul>
          
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Company</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          
          <li><Link to="/store-locator">Store Locator</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><Link to="/policy">Privacy Policy</Link></li>
        
          
        </ul>
      </div>
      <div className="footer-section">
        <h4>Connect</h4>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
      <div className="payment-icons">
        <span>Visa</span> | <span>Mastercard</span> | <span>PayPal</span>
      </div>
    </div>
  </footer>
);

export default Footer;
