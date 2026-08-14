import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow p-3 flex items-center gap-3"
          >
            <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">{item.title}</p>
              <p className="text-blue-600 font-bold text-sm">${item.price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
              className="w-14 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</span>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
