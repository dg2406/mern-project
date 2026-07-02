import React from "react";
import Layout from "../components/layout";
import "./Policy.css";

const Policy = () => {
  return (
    <Layout title={"Policy - Ecommerce App"}>
      <div className="policy-page">
        <div className="policy-container">
          <h1>Privacy Policy</h1>

          <p>
            Welcome to <strong>E-Commerce App</strong>. Your privacy is
            important to us. This Privacy Policy explains how we collect,
            use, and protect your personal information.
          </p>

          <h4>1. Information We Collect</h4>
          <p>
            We may collect your name, email address, phone number,
            shipping address, and payment details when you use our
            services.
          </p>

          <h4>2. How We Use Your Information</h4>
          <p>
            We use your information to process orders, improve our
            services, provide customer support, and send important
            updates regarding your purchases.
          </p>

          <h4>3. Data Security</h4>
          <p>
            We implement appropriate security measures to protect your
            personal information from unauthorized access, alteration,
            or disclosure.
          </p>

          <h4>4. Third-Party Services</h4>
          <p>
            We may share limited information with trusted third-party
            partners such as payment gateways and shipping providers to
            fulfill your orders.
          </p>

          <h4>5. Contact Us</h4>
          <p>
            If you have any questions regarding our Privacy Policy,
            please contact us at <strong>help@ecommerceapp.com</strong>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;