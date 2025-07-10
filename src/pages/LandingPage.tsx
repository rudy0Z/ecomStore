import React from 'react';
import { ArrowRight, Star, ShoppingBag, Clock, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/mockProducts';

export const LandingPage: React.FC = () => {
  const { addToCart } = useApp();

  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);
  const saleProducts = mockProducts.filter(p => p.originalPrice).slice(0, 6);

  const handleQuickAdd = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-accent text-accent-foreground mb-4 animate-scale-in">
                🔥 Black Friday Sale - Up to 70% Off
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
                Mega Sale
                <span className="block text-accent">Incoming!</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
                Get ready for the biggest sale of the year. Premium products at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Link to="/offers">
                  <Button variant="accent" size="xl" className="group">
                    Shop Sale Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-white text-sm mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold">${product.price}</span>
                      <Button size="sm" variant="accent" onClick={() => handleQuickAdd(product)}>
                        <ShoppingBag className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Countdown */}
      <section className="py-12 bg-destructive text-destructive-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Sale Starts In</h2>
          </div>
          <div className="flex justify-center space-x-4 text-center">
            {['2', '14', '30', '45'].map((time, index) => (
              <div key={index} className="bg-destructive-foreground text-destructive rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold">{time}</div>
                <div className="text-sm">{['Days', 'Hours', 'Mins', 'Secs'][index]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Discover amazing products across all categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: '📱', color: 'bg-blue-500' },
              { name: 'Fashion', icon: '👕', color: 'bg-pink-500' },
              { name: 'Beauty', icon: '💄', color: 'bg-purple-500' },
              { name: 'Home & Garden', icon: '🏠', color: 'bg-green-500' }
            ].map((category) => (
              <Link key={category.name} to={`/categories?filter=${category.name.toLowerCase()}`}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Products */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">⚡ Flash Sale</h2>
              <p className="text-muted-foreground">Limited time offers on selected items</p>
            </div>
            <Link to="/offers">
              <Button variant="outline">
                View All Offers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {saleProducts.map((product) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              
              return (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      -{discount}%
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-lg">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="cart"
                      className="w-full"
                      onClick={() => handleQuickAdd(product)}
                    >
                      Quick Add
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free shipping on orders over $50'
              },
              {
                icon: Shield,
                title: 'Secure Payment',
                description: '100% secure payment processing'
              },
              {
                icon: Star,
                title: 'Premium Quality',
                description: 'Only the best products for you'
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/90 mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button variant="accent" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};