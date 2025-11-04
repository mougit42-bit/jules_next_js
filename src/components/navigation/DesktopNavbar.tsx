'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, shopMenu } from './links';
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import { CartContext } from '@/context/CartContext';
import { AuthContext } from '@/context/AuthContext';
import useScrollPosition from '@/hooks/useScrollPosition';

const DesktopNavbar = () => {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const scrollPosition = useScrollPosition();
  const shopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShopMenuOpen(false);
      }
    };

    if (isShopMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShopMenuOpen]);

  if (!cartContext || !authContext) {
    return null;
  }

  const { cartItems } = cartContext;
  const { isLoggedIn, logout } = authContext;

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isScrolled = scrollPosition > 50;

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -10 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-[0_2px_15px_-5px_rgba(0,0,0,0.1)] text-neutral-900'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full max-w-7xl">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link href="/" className={`text-2xl font-bold tracking-wide ${isScrolled ? 'text-rose-500' : 'text-white'}`}>
            Jules Beauty
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navLinks.map(link => (
            <motion.li
              key={link.name}
              onMouseEnter={() => {
                setHoveredLink(link.name);
                if (link.name === 'Shop') setIsShopMenuOpen(true);
              }}
              onMouseLeave={() => {
                setHoveredLink(null);
                if (link.name === 'Shop') setIsShopMenuOpen(false);
              }}
              onFocus={() => {
                if (link.name === 'Shop') setIsShopMenuOpen(true);
              }}
              onBlur={() => {
                if (link.name === 'Shop') setIsShopMenuOpen(false);
              }}
              className="relative"
            >
              <Link
                href={link.href}
                className="flex items-center space-x-1 tracking-wider"
                aria-haspopup={link.name === 'Shop'}
                aria-expanded={link.name === 'Shop' && isShopMenuOpen}
              >
                <span>{link.name}</span>
                {link.name === 'Shop' && <ChevronDown size={16} />}
              </Link>
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-fuchsia-500"
                />
              )}
              {link.name === 'Shop' && isShopMenuOpen && (
                <AnimatePresence>
                  <motion.div
                    ref={shopMenuRef}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-6 text-black"
                    role="menu"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {shopMenu.categories.map(category => (
                        <motion.div key={category.name} variants={menuItemVariants} role="menuitem">
                          <Link
                            href={category.href}
                            className="block text-gray-700 hover:text-rose-500"
                          >
                            {category.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Right: Utility Actions */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`${isScrolled ? 'text-neutral-900' : 'text-white'} hover:text-rose-500`}
            aria-label="Search"
          >
            <Search size={24} strokeWidth={1.5} />
          </motion.button>
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={logout}
              className={`${isScrolled ? 'text-neutral-900' : 'text-white'} hover:text-rose-500`}
              aria-label="Logout"
            >
              Logout
            </motion.button>
          ) : (
            <Link
              href="/login"
              className={`${isScrolled ? 'text-neutral-900' : 'text-white'} hover:text-rose-500`}
              aria-label="Login"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <User size={24} strokeWidth={1.5} />
              </motion.div>
            </Link>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`${isScrolled ? 'text-neutral-900' : 'text-white'} hover:text-rose-500`}
            aria-label="Favorites"
          >
            <Heart size={24} strokeWidth={1.5} />
          </motion.button>
          <Link
            href="/cart"
            className={`relative ${isScrolled ? 'text-neutral-900' : 'text-white'} hover:text-rose-500`}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-fuchsia-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default DesktopNavbar;
