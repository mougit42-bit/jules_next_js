import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
