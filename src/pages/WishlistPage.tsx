import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductModal } from '@/components/store/ProductModal';
import { Product, useApp } from '@/contexts/AppContext';

export const WishlistPage: React.FC = () => {
  const { state, addToCart, removeFromWishlist } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist and never lose track of them.
            </p>
            <Link to="/categories">
              <Button size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {state.wishlist.length} {state.wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Link to="/categories">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.wishlist.map((product) => {
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    onClick={() => handleProductClick(product)}
                  />
                  
                  {discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      -{discount}%
                    </Badge>
                  )}
                  
                  {product.featured && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 
                    className="font-semibold text-foreground truncate mb-2 cursor-pointer hover:text-primary"
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Badge variant="secondary">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="cart"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMoveToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Move to Cart' : 'Out of Stock'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {!product.inStock && (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      We'll notify you when it's back in stock
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="p-6 bg-muted/30">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  state.wishlist.forEach(product => {
                    if (product.inStock) {
                      addToCart(product);
                    }
                  });
                  // Clear wishlist of in-stock items
                  state.wishlist.forEach(product => {
                    if (product.inStock) {
                      removeFromWishlist(product.id);
                    }
                  });
                }}
                disabled={!state.wishlist.some(p => p.inStock)}
              >
                Add All Available to Cart
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  state.wishlist.forEach(product => {
                    removeFromWishlist(product.id);
                  });
                }}
              >
                Clear Wishlist
              </Button>
            </div>
          </Card>
        </div>
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