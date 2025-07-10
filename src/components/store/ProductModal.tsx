import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Product, useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useApp();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock additional images for gallery
  const images = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Image Gallery */}
          <div className="relative bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="p-6 h-full flex flex-col">
              {/* Main Image */}
              <div className="flex-1 mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {discount > 0 && (
                  <Badge className="absolute top-6 left-6 bg-destructive text-destructive-foreground">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-muted-foreground"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <div className="flex-1">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-bold text-foreground pr-4">
                    {product.name}
                  </h1>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <Badge variant="secondary" className="mb-4">
                  {product.category}
                </Badge>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge variant="destructive">
                      Save ${(product.originalPrice! - product.price).toFixed(2)}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Fast shipping and easy returns</li>
                  <li>• 1-year warranty included</li>
                  <li>• Customer support 24/7</li>
                </ul>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-success">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    In Stock - Ready to ship
                  </div>
                ) : (
                  <div className="flex items-center text-destructive">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="border-t border-border pt-6">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};