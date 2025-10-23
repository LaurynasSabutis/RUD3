import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const nextErrors = {
      email: formValues.email.trim() === "" ? "Can't be empty" : "",
      password: formValues.password.trim() === "" ? "Can't be empty" : "",
      confirmPassword:
        formValues.confirmPassword.trim() === ""
          ? "Can't be empty"
          : formValues.confirmPassword !== formValues.password
          ? "Passwords must match"
          : "",
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    // TODO: replace with real signup flow
    console.log("Signing up with:", formValues);
  };

  return (
    <div className="login-page">
      <img
        src="/assets/logo.svg"
        alt="Entertainment app logo"
        className="login-logo"
      />

      <div className="login-card">
        <h1 className="login-title">Sign Up</h1>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formValues.email}
              onChange={handleChange}
              className={`login-input ${errors.email ? "has-error" : ""}`}
            />
            {errors.email && <p className="login-error">{errors.email}</p>}
          </div>

          <div className="login-field">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              className={`login-input ${errors.password ? "has-error" : ""}`}
            />
            {errors.password && (
              <p className="login-error">{errors.password}</p>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className={`login-input ${
                errors.confirmPassword ? "has-error" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="login-error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="login-submit">
            Create an account
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <Link to="/login" className="login-footer__link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
