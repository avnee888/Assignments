import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-3"
      />
      <h3 className="text-sm font-medium flex-1 line-clamp-2">{product.title}</h3>
      <p className="text-xs text-gray-500 capitalize mt-1">{product.category}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
