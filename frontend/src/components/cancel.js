import React from "react";
import Layout from "../components/layout";

const Cancel = () => {
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
          <h1>❌ Payment Cancelled</h1>

          <h3>
            Payment was not completed
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Cancel;