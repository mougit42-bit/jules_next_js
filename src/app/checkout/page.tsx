'use client';

import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!cartContext) {
    return null;
  }

  const { cartItems, clearCart } = cartContext;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would process the payment here.
    clearCart();
    router.push('/confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <p>{item.name} x {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 w-full"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
