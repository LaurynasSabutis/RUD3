import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

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

    // TODO: replace with real auth flow
    console.log("Logging in with:", formValues);
  };

  return (
    <div className="min-h-screen bg-[#10141E] text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center gap-16">
        <img src="/assets/logo.svg" alt="Entertainment app logo" className="h-12 w-12" />

        <div className="w-full max-w-lg rounded-[1.75rem] bg-[#161D2F] px-12 py-12 shadow-2xl">
          <h1 className="text-3xl font-semibold mb-9">Login</h1>

          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <div>
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
                className={`w-full bg-transparent border-b border-white/20 pb-3 text-lg outline-none transition-colors duration-200 placeholder:text-white/60 focus:border-white ${
                  errors.email ? "border-[#FC4747] focus:border-[#FC4747]" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-[#FC4747] text-right">{errors.email}</p>
              )}
            </div>

            <div>
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
                className={`w-full bg-transparent border-b border-white/20 pb-3 text-lg outline-none transition-colors duration-200 placeholder:text-white/60 focus:border-white ${
                  errors.password ? "border-[#FC4747] focus:border-[#FC4747]" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-[#FC4747] text-right">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3.5 text-[#10141E] text-lg font-semibold transition-colors duration-200 hover:bg-white/90"
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>

      <p className="mt-8 text-white/70 text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-[#FC4747] font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
