import React from 'react';
import Link from 'next/link';

const ConfirmationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
      <Link href="/products" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ConfirmationPage;
