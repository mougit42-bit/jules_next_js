'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { isLoggedIn, logout } = authContext;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-500">
          Jules Beauty
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/products" className="text-gray-600 hover:text-pink-500">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-pink-500">
                Cart
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-pink-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="text-gray-600 hover:text-pink-500">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
