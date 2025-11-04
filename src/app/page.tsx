import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';

const HomePage = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      <Hero />
      {/* Featured Products Section */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-50 text-center py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Beauty Club</h2>
        <p className="text-lg text-gray-700 mb-8">
          Get exclusive offers, beauty tips, and new product announcements.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border rounded-l-lg w-full max-w-sm"
          />
          <button className="bg-pink-500 text-white px-6 py-3 rounded-r-lg hover:bg-pink-600">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
