import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StepTwo({ formData, setFormData, onNext, onBack }) {
  const { email, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const errors = {};
  if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email (must contain @)";
  if (password.length < 8) errors.password = "Password must be at least 8 characters";
  if (confirmPassword !== password) errors.confirmPassword = "Passwords do not match";

  const isValid = Object.keys(errors).length === 0;
  const type = showPassword ? "text" : "password";

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Account Details</h2>

      <input
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      {email && errors.email && <p className="error">{errors.email}</p>}

      <div className="pw-row">
        <input
          type={type}
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {password && errors.password && <p className="error">{errors.password}</p>}

      <input
        type={type}
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleChange}
      />
      {confirmPassword && errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}

      <button type="button" onClick={onBack}>Back</button>
      <button type="button" disabled={!isValid} onClick={onNext}>Next</button>
    </form>
  );
}