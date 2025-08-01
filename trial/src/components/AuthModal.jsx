import React, { useState, useEffect } from "react";
import "./AuthModal.css";

const GENDERS = ["Male", "Female", "Other"];

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "Male",
    email: "",
    password: "",
    confirmPassword: "",
    nightMode: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Close modal on ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "Email and password are required.";
    }
    if (!isLogin) {
      if (!form.name) return "Name is required.";
      if (!form.age || isNaN(form.age) || form.age < 1) return "Valid age is required.";
      if (!form.dob) return "Date of birth is required.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    // Mock user creation/login
    const userData = {
      id: "user-" + Date.now(),
      name: form.name || "User",
      age: form.age || "N/A",
      dob: form.dob || "N/A",
      gender: form.gender,
      email: form.email,
      nightMode: form.nightMode,
      avatar: "", // Will be generated in Navbar / defaults
    };

    onAuthSuccess(userData);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div
        className="modal-card modal-animate"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className="modal-logo-area">
          <img
            src="/whatsapp-logo.png"
            alt="Message X logo"
            className="modal-logo"
            draggable={false}
          />
          <span className="modal-brand">Message X</span>
        </div>
        <h2 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required={!isLogin}
                autoComplete="name"
              />
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="150"
                value={form.age}
                onChange={handleChange}
                placeholder="Your age"
                required={!isLogin}
              />
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required={!isLogin}
              />
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <label>
                <input
                  name="nightMode"
                  type="checkbox"
                  checked={form.nightMode}
                  onChange={handleChange}
                />{" "}
                Enable Night Mode
              </label>
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <label htmlFor="password">Password</label>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              className="show-hide"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {!isLogin && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
                autoComplete="new-password"
              />
            </>
          )}

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="premium-btn submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="form-switch-text">
          {isLogin ? (
            <>
              New user?{" "}
              <button
                className="switch-btn"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="switch-btn"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
