import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 rounded-lg overflow-hidden my-8">
        <Image
          src="/images/hero-bg.jpg"
          alt="Jules Beauty"
          layout="fill"
          objectFit="cover"
          className="z-0"
          unoptimized
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Jules Beauty</h1>
          <p className="text-xl text-white mb-8">Discover Your Natural Glow</p>
          <Link href="/products" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
            Shop Now
          </Link>
        </div>
      </section>

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
