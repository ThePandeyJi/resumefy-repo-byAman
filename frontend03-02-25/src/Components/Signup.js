import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Signup.css";
import { url } from "../api/apiendpoint";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${url}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Signup Successful!",
            text: "Welcome to the dashboard!",
            confirmButtonText: "Go to login",
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: data.message || "An error occurred during signup",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Failed to connect to the server",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="login-container"> {/* Same container as login */}
      <div className="login-card"> {/* Match card size and padding */}
        <h1 className="login-title">Sign Up</h1>
        <p className="login-subtitle">Create your account to start building your resume</p>
        <form className="login-form" onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="login-input"
          />
          {touched.name && errors.name && (
            <p className="error-message">{errors.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="login-input"
          />
          {touched.email && errors.email && (
            <p className="error-message">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="login-input"
          />
          {touched.password && errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <button type="submit" className="login-submit-btn">Sign Up</button>
        </form>

        <p className="login-redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
