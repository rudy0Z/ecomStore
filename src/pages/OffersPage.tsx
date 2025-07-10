import React, { useState } from 'react';
import { Clock, Flame, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductModal } from '@/components/store/ProductModal';
import { Product, useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/mockProducts';

export const OffersPage: React.FC = () => {
  const { addToCart } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const saleProducts = mockProducts.filter(p => p.originalPrice);
  const featuredDeals = saleProducts.slice(0, 6);
  const flashSaleProducts = saleProducts.slice(6, 12);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Banner */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-accent text-accent-foreground mb-4 animate-scale-in">
            🔥 Limited Time Only
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Mega Sale Event
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Incredible discounts on thousands of products. Save up to 70% on your favorite items.
          </p>
          
          {/* Sale Timer */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-semibold">Sale ends in:</span>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            {['2', '14', '30', '45'].map((time, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold">{time}</div>
                <div className="text-sm">{['Days', 'Hours', 'Mins', 'Secs'][index]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Deal Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Deal Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Flash Sale',
                description: 'Lightning deals that won\'t last long',
                icon: '⚡',
                color: 'bg-yellow-500',
                discount: 'Up to 60% OFF'
              },
              {
                title: 'Daily Deals',
                description: 'New deals every day',
                icon: '🎯',
                color: 'bg-blue-500',
                discount: 'Up to 50% OFF'
              },
              {
                title: 'Clearance',
                description: 'Final markdowns on selected items',
                icon: '🏷️',
                color: 'bg-red-500',
                discount: 'Up to 70% OFF'
              }
            ].map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-3">{category.description}</p>
                <Badge variant="destructive" className="mb-4">
                  {category.discount}
                </Badge>
                <Button variant="outline" size="sm" className="w-full">
                  Shop Now
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Deals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Flame className="h-8 w-8 text-red-500" />
              <div>
                <h2 className="text-3xl font-bold">Featured Deals</h2>
                <p className="text-muted-foreground">Don't miss these amazing offers</p>
              </div>
            </div>
            <Link to="/categories">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map(product => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard
                  product={product}
                  view="grid"
                  onClick={handleProductClick}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="mb-16 bg-accent/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Badge className="bg-destructive text-destructive-foreground mb-4">
              ⚡ FLASH SALE
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
            <p className="text-muted-foreground">These deals won't last long - grab them while you can!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flashSaleProducts.map(product => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              
              return (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleProductClick(product)}>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      -{discount}%
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <span className="font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="cart"
                      className="w-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Savings Banner */}
        <section className="text-center">
          <Card className="p-8 bg-gradient-accent text-accent-foreground">
            <h2 className="text-3xl font-bold mb-4">Save Even More!</h2>
            <p className="text-lg mb-6 text-accent-foreground/90">
              Sign up for our newsletter and get an additional 10% off your first order
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button variant="secondary" className="px-8">
                Get 10% Off
              </Button>
            </div>
          </Card>
        </section>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};