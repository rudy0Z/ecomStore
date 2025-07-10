import { Product } from '@/contexts/AppContext';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 156,
    description: 'High-quality wireless headphones with premium sound and noise cancellation technology.',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Smartphone Pro Max',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    reviews: 342,
    description: 'Latest flagship smartphone with advanced camera system and lightning-fast performance.',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Designer Leather Jacket',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.6,
    reviews: 89,
    description: 'Stylish genuine leather jacket with modern cut and premium finishing.',
    inStock: true
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviews: 234,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS functionality.',
    inStock: true
  },
  {
    id: '5',
    name: 'Luxury Perfume',
    price: 89.99,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    category: 'Beauty',
    rating: 4.7,
    reviews: 167,
    description: 'Elegant fragrance with notes of vanilla, jasmine, and sandalwood.',
    inStock: false
  },
  {
    id: '6',
    name: 'Gaming Laptop',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 128,
    description: 'High-performance gaming laptop with RTX graphics and fast SSD storage.',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Casual Sneakers',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.4,
    reviews: 203,
    description: 'Comfortable casual sneakers perfect for everyday wear and light activities.',
    inStock: true
  },
  {
    id: '8',
    name: 'Professional Camera',
    price: 2199.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    reviews: 76,
    description: 'Professional DSLR camera with advanced autofocus and 4K video recording.',
    inStock: true
  },
  {
    id: '9',
    name: 'Skincare Set',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    category: 'Beauty',
    rating: 4.6,
    reviews: 145,
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer.',
    inStock: true
  },
  {
    id: '10',
    name: 'Wireless Speaker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviews: 189,
    description: 'Portable wireless speaker with 360-degree sound and waterproof design.',
    inStock: true
  },
  {
    id: '11',
    name: 'Vintage Sunglasses',
    price: 159.99,
    originalPrice: 219.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.5,
    reviews: 98,
    description: 'Classic vintage-style sunglasses with UV protection and premium frame.',
    inStock: true
  },
  {
    id: '12',
    name: 'Smart Home Hub',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.2,
    reviews: 156,
    description: 'Central hub for smart home automation with voice control and app integration.',
    inStock: true
  }
];

export const categories = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Garden',
  'Sports',
  'Books'
];