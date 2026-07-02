import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Layout from "../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("/api/v1/auth/login", values);
        if (res.data.success) {
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("token", res.data.token);           

          navigate(location.state?.from || "/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
      resetForm();
    },
  });

  return (
    <Layout>
      <div className="login-section">
        <form onSubmit={formik.handleSubmit} className="login-form" noValidate>
          <h2 className="form-title">Login to Your Account</h2>

          {/* Email */}
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

          {/* Password */}
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
         <button type="submit" style={{backgroundColor:"#14caa3"}} onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>

          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
