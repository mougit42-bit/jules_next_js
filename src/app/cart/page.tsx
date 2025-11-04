'use client';

import React, { useContext } from 'react';
import { CartContext, CartItem } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) {
    return null;
  }

  const { cartItems, removeFromCart, clearCart } = cartContext;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 border rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            <div className="flex justify-end mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 mr-4"
              >
                Clear Cart
              </button>
              <button
                onClick={() => router.push('/checkout')}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
