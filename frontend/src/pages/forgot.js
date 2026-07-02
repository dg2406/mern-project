import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Layout from "../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    question: Yup.string()
      .required("Answer is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      question: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(
          "/api/v1/auth/forgot-password",
          values
        );

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      resetForm();
    },
  });

  return (
    <Layout>
      <div className="login-section">
        <form onSubmit={formik.handleSubmit} className="login-form" noValidate>
          <h2 className="form-title">Reset Password</h2>

          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
            className={
              formik.touched.email && formik.errors.email ? "input-error" : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}

          <label>Security Answer</label>
          <input
            name="question"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.question}
            placeholder="Enter your answer"
            className={
              formik.touched.question && formik.errors.question
                ? "input-error"
                : ""
            }
          />
          {formik.touched.question && formik.errors.question && (
            <div className="error-message">{formik.errors.question}</div>
          )}

          <label>New Password</label>
          <input
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            placeholder="Enter new password"
            className={
              formik.touched.newPassword && formik.errors.newPassword
                ? "input-error"
                : ""
            }
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="error-message">{formik.errors.newPassword}</div>
          )}

          <button type="submit" style={{ backgroundColor: "#14caa3" }}>
            Reset Password
          </button>

          <button type="button" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
