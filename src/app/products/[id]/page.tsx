'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { CartContext } from '@/context/CartContext';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const product = products.find(p => p.id.toString() === params.id);
  const cartContext = useContext(CartContext);

  if (!product) {
    notFound();
  }

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const { addToCart } = cartContext;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg shadow-lg"
            unoptimized
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-pink-500 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
