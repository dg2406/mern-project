import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import Layout from "../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  // Define Yup validation schema
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must only contain digits")
      .min(10, "Phone number must be at least 10 digits"),
    role: Yup.string().required("Role is required"),
    question: Yup.string().required("Answer is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      role: "",
      question: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("/api/v1/auth/register", values);
        if (res.data.success) {
          toast.success(res.data.message);

          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something is wrong");
      }
      resetForm();
    },
  });

  return (
    <Layout>
      <div className="register-section">
        <form
          onSubmit={formik.handleSubmit}
          className="register-form"
          noValidate
        >
          <h2 className="form-title">Create Your Account</h2>

          <label>Name</label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter your name"
            className={
              formik.touched.name && formik.errors.name ? "input-error" : ""
            }
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}

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
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}

          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter your password"
            className={
              formik.touched.password && formik.errors.password
                ? "input-error"
                : ""
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}

          <label>Address</label>
          <input
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Enter your address"
            className={
              formik.touched.address && formik.errors.address
                ? "input-error"
                : ""
            }
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error-message">{formik.errors.address}</div>
          ) : null}

          <label>Phone</label>
          <input
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="Enter your number"
            className={
              formik.touched.phone && formik.errors.phone ? "input-error" : ""
            }
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error-message">{formik.errors.phone}</div>
          ) : null}

          <label>Role</label>
          <input
            name="role"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            placeholder="Enter your role"
            className={
              formik.touched.role && formik.errors.role ? "input-error" : ""
            }
          />
          {formik.touched.role && formik.errors.role ? (
            <div className="error-message">{formik.errors.role}</div>
          ) : null}

          <label>Question</label>
          <input
            name="question"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.question}
            placeholder="What is your favorite colour"
            className={
              formik.touched.question && formik.errors.question ? "input-error" : ""
            }
          />
          {formik.touched.question && formik.errors.question ? (
            <div className="error-message">{formik.errors.question}</div>
          ) : null}

          <button type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
