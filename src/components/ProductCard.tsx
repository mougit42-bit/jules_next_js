import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-64 object-cover"
            unoptimized
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
