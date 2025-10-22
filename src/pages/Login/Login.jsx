import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const usersData = !Array.isArray(data) && Array.isArray(data.users) ? data.users : [];
        setUsers(usersData);
      })
      .catch((err) => console.error("Error loading users:", err));
  }, []);

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
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    const email = formValues.email.trim();
    const password = formValues.password.trim();
    const user = users.find((u) => u.email === email);

    if (!user || user.password !== password) {
      setAuthError("Invalid email or password");
      return;
    }

    setAuthError("");
    console.log("Logged in as", email);
    navigate("/");
  };

  return (
    <div className="login-page">
      <img
        src="/assets/logo.svg"
        alt="Entertainment app logo"
        className="login-logo"
      />

      <div className="login-card">
        <h1 className="login-title">Login</h1>

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
            {errors.email && (
              <p className="login-error">{errors.email}</p>
            )}
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

          <button type="submit" className="login-submit">
            Login to your account
          </button>
        </form>

        {authError && <p className="login-error" style={{ textAlign: "center" }}>{authError}</p>}

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="login-footer__link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
