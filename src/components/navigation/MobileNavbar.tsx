'use client';

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, shopMenu } from './links';
import { Menu, X, ChevronDown, Search, User, Heart, ShoppingCart } from 'lucide-react';
import { CartContext } from '@/context/CartContext';
import { AuthContext } from '@/context/AuthContext';

const MobileNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShopAccordionOpen, setIsShopAccordionOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  if (!cartContext || !authContext) {
    return null;
  }

  const { cartItems } = cartContext;
  const { isLoggedIn, logout } = authContext;

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md text-black shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link href="/" className="text-xl font-bold text-pink-500">
          Jules Beauty
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative text-gray-600 hover:text-pink-500" aria-label={`Shopping cart with ${cartItemCount} items`}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsDrawerOpen(true)} aria-label="Open menu" aria-expanded={isDrawerOpen}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 p-6 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-heading"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 id="menu-heading" className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setIsDrawerOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-full"
                  aria-label="Search"
                />
              </div>

              <ul className="space-y-4 flex-grow">
                {navLinks.map(link => (
                  <li key={link.name}>
                    {link.name === 'Shop' ? (
                      <div>
                        <button
                          onClick={() => setIsShopAccordionOpen(!isShopAccordionOpen)}
                          className="w-full flex justify-between items-center"
                          aria-expanded={isShopAccordionOpen}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isShopAccordionOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isShopAccordionOpen && (
                          <ul className="pl-4 mt-2 space-y-2">
                            {shopMenu.categories.map(category => (
                              <li key={category.name}>
                                <Link
                                  href={category.href}
                                  className="block text-gray-700 hover:text-pink-500"
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link href={link.href} className="block">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="flex items-center justify-around">
                  {isLoggedIn ? (
                    <button onClick={logout} className="text-gray-600 hover:text-pink-500" aria-label="Logout">
                      Logout
                    </button>
                  ) : (
                    <Link href="/login" className="text-gray-600 hover:text-pink-500" aria-label="Login">
                      <User size={24} />
                    </Link>
                  )}
                  <Link href="/favorites" className="text-gray-600 hover:text-pink-500" aria-label="Favorites">
                    <Heart size={24} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavbar;
