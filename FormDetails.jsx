import React from "react";
import "./styles.css";

export default function FormDetails({ data, onBack }) {
  return (
    <div className="form-container">
      <h2>Submitted Details</h2>
      <ul className="details-list">
        <li><strong>First Name:</strong> {data.firstName}</li>
        <li><strong>Last Name:</strong> {data.lastName}</li>
        <li><strong>Username:</strong> {data.username}</li>
        <li><strong>Email:</strong> {data.email}</li>
        <li><strong>Password:</strong> {"*".repeat(data.password.length)}</li>
        <li><strong>Phone:</strong> {data.countryCode} {data.phone}</li>
        <li><strong>Country:</strong> {data.country}</li>
        <li><strong>City:</strong> {data.city}</li>
        <li><strong>PAN:</strong> {data.pan}</li>
        <li><strong>Aadhaar:</strong> {data.aadhaar}</li>
      </ul>
      <button onClick={onBack}>Back to Form</button>
    </div>
  );
}