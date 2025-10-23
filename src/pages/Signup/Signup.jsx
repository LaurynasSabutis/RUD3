import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Signup = () => {
  const navigate = useNavigate();
  // Endpoint that will store new users.
  const USERS_API_URL =
    import.meta.env.VITE_USERS_API_URL ?? "/api/users";

  // Form fields we show on the screen.
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Simple validation messages for every input.
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Status flags for network request.
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (evt) => {
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

    const email = formValues.email.trim();
    const password = formValues.password.trim();

    setIsSubmitting(true);
    setServerError("");

    try {
      // Send the new account to the backend.
      const createUserResponse = await fetch(USERS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!createUserResponse.ok) {
        throw new Error(`Failed to create user (${createUserResponse.status})`);
      }

      // Reset the form so it looks fresh.
      setFormValues({
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setServerError("Could not create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

          <button
            type="submit"
            className="login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create an account"}
          </button>
        </form>

        {serverError && (
          <p className="login-error" style={{ textAlign: "center" }}>
            {serverError}
          </p>
        )}

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
