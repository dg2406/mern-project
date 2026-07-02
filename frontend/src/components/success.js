import React from "react";
import Layout from "../components/layout";

const Success = () => {
  return (
    <Layout>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            color: "white"
          }}
        >
          <h1>✅ Payment Successful</h1>

          <h3>
            Your order has been placed successfully
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Success;