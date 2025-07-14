// src/pages/SuccessPage.js

import React from 'react';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg">Thank you for your purchase. We’re processing your order now.</p>
    </div>
  );
}
