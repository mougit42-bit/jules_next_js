export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Luxury Gold Serum',
    price: 75.00,
    imageUrl: '/images/product1.jpg',
    description: 'A luxurious serum infused with 24k gold to rejuvenate your skin.'
  },
  {
    id: 2,
    name: 'Rosewater Face Mist',
    price: 25.00,
    imageUrl: '/images/product2.jpg',
    description: 'A refreshing face mist to hydrate and soothe your skin.'
  },
  {
    id: 3,
    name: 'Charcoal Clay Mask',
    price: 45.00,
    imageUrl: '/images/product3.jpg',
    description: 'A detoxifying clay mask to purify and brighten your complexion.'
  },
  {
    id: 4,
    name: 'Vitamin C Brightening Cream',
    price: 60.00,
    imageUrl: '/images/product4.jpg',
    description: 'A daily moisturizer to brighten and even out your skin tone.'
  },
  {
    id: 5,
    name: 'Hydrating Lip Balm',
    price: 15.00,
    imageUrl: '/images/product5.jpg',
    description: 'A nourishing lip balm to keep your lips soft and hydrated.'
  },
  {
    id: 6,
    name: 'Gentle Cleansing Foam',
    price: 30.00,
    imageUrl: '/images/product6.jpg',
    description: 'A gentle foam cleanser to remove impurities without stripping your skin.'
  }
];
