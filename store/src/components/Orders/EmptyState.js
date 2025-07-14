import React from 'react';
import emptyCart from '../../assets/empty-cart.png';
import { useStateContext } from '../../context/StateContextProvider';

export default function EmptyState() {
  const { handleScrollToProducts } = useStateContext();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-gray-700">
      <img
        src={emptyCart}
        alt="Illustration of empty cart"
        className="w-40 h-40 mb-6 object-contain"
      />
      <p className="text-lg mb-2">
        Oh no.. your cart is empty
        <br />
        <span className="text-pink-600 font-semibold">
          but it doesn&apos;t have to be
        </span>
      </p>
      <button
        onClick={handleScrollToProducts}
        className="mt-6 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
      >
        Shop Now
      </button>
    </div>
  );
}
