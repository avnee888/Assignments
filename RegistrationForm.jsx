import React, { useState } from "react";
import "./styles.css";

const initialForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  countryCode: "+1",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: "",
};

function validate(form) {
  const errors = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";

  if (!form.username.trim()) errors.username = "Username is required";
  else if (form.username.length < 4) errors.username = "Username must be at least 4 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";

  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\d{7,12}$/.test(form.phone)) errors.phone = "Enter 7-12 digits";

  if (!form.country.trim()) errors.country = "Country is required";
  if (!form.city.trim()) errors.city = "City is required";

  if (!form.pan.trim()) errors.pan = "PAN is required";
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.toUpperCase()))
    errors.pan = "Format: ABCDE1234F";

  if (!form.aadhaar.trim()) errors.aadhaar = "Aadhaar is required";
  else if (!/^\d{12}$/.test(form.aadhaar)) errors.aadhaar = "Enter exactly 12 digits";

  return errors;
}

export default function RegistrationForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: name === "pan" ? value.toUpperCase() : value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error-input" : ""}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>

        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error-input" : ""}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>

        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="field">
          <label>Phone Number</label>
          <div className="phone-row">
            <select name="countryCode" value={form.countryCode} onChange={handleChange}>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
              <option value="+61">+61</option>
              <option value="+81">+81</option>
            </select>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
            />
          </div>
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="field">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={errors.country ? "error-input" : ""}
          />
          {errors.country && <p className="error-text">{errors.country}</p>}
        </div>

        <div className="field">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={errors.city ? "error-input" : ""}
          />
          {errors.city && <p className="error-text">{errors.city}</p>}
        </div>

        <div className="field">
          <label>PAN</label>
          <input
            type="text"
            name="pan"
            value={form.pan}
            onChange={handleChange}
            maxLength={10}
            className={errors.pan ? "error-input" : ""}
          />
          {errors.pan && <p className="error-text">{errors.pan}</p>}
        </div>

        <div className="field">
          <label>Aadhaar</label>
          <input
            type="text"
            name="aadhaar"
            value={form.aadhaar}
            onChange={handleChange}
            maxLength={12}
            className={errors.aadhaar ? "error-input" : ""}
          />
          {errors.aadhaar && <p className="error-text">{errors.aadhaar}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}