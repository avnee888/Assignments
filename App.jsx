import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import FormDetails from "./FormDetails";

export default function App() {
  const [page, setPage] = useState("form");
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setPage("details");
  };

  const handleBack = () => {
    setPage("form");
  };

  return page === "form" ? (
    <RegistrationForm onSubmit={handleSubmit} />
  ) : (
    <FormDetails data={formData} onBack={handleBack} />
  );
}