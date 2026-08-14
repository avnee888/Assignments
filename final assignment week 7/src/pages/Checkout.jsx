import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = "Enter a 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = "Format: MM/YY";
    if (!/^\d{3}$/.test(form.cvv)) newErrors.cvv = "Enter a 3-digit CVV";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p className="mb-4 text-sm text-gray-600">
        Total to pay: <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label className="text-sm font-medium">Name on Card</label>
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm ${errors.cardName ? "border-red-500 bg-red-50" : ""}`}
          />
          {errors.cardName && <p className="text-red-600 text-xs mt-1">{errors.cardName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            maxLength={16}
            placeholder="1234567812345678"
            value={form.cardNumber}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm ${errors.cardNumber ? "border-red-500 bg-red-50" : ""}`}
          />
          {errors.cardNumber && <p className="text-red-600 text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium">Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              placeholder="08/27"
              value={form.expiry}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.expiry ? "border-red-500 bg-red-50" : ""}`}
            />
            {errors.expiry && <p className="text-red-600 text-xs mt-1">{errors.expiry}</p>}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              maxLength={3}
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.cvv ? "border-red-500 bg-red-50" : ""}`}
            />
            {errors.cvv && <p className="text-red-600 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
        >
          Pay ${totalPrice.toFixed(2)}
        </button>
      </form>
    </div>
  );
}
