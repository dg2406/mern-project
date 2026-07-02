import React from "react";
import Layout from "../components/layout";
import "./About.css";

const About = () => {
  return (
    <Layout title={"About Us - Ecommerce App"}>
      <div className="about-page">
        <div className="about-container">
          {/* Image */}
          <div className="about-image">
            <img src="about.jpeg" alt="About Us" />
          </div>

          {/* Content */}
          <div className="about-content">
            <h1>About Us</h1>

            <p>
              Welcome to <strong>E-Commerce App</strong> – your trusted
              destination for effortless online shopping.
            </p>

            <p>
              Our mission is to make buying products online easy, secure,
              and enjoyable for everyone. We offer quality products,
              competitive prices, and exceptional customer service.
            </p>

            <p>
              Founded by a team passionate about technology and customer
              satisfaction, we carefully curate our catalog to meet the
              diverse needs of our shoppers.
            </p>

            <p>
              Whether you're looking for the latest electronics, fashion
              trends, or daily essentials, we're committed to bringing you
              exciting choices every day.
            </p>

            <p>
              Customer trust is at the heart of everything we do. Thank
              you for choosing <strong>E-Commerce App</strong>. We look
              forward to serving you!
            </p>

           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;