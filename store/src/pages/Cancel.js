import React from 'react';
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Until next time</h1>
      <p className="text-gray-600 max-w-md mb-6">
        We're sorry to see you cancelled your Stripe payment. See you on your next purchase!
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition"
      >
        Continue to Homepage
      </button>
    </section>
  );
}

export default Cancel;
