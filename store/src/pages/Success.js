import React from 'react';
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
        Thank you for your purchase!
      </h1>

      <p className="text-gray-700 max-w-md mb-3">
        A receipt of your order will be sent to your email.
        <br /> It will be delivered in 2–5 business days.
      </p>

      <p className="text-gray-600 max-w-md mb-6">
        Email us at{' '}
        <a
          href="mailto:cakeit@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="text-pink-600 underline hover:text-pink-700"
        >
          cakeit@gmail.com
        </a>{' '}
        with any questions or suggestions.
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

export default Success;
