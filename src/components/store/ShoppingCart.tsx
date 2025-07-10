import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export const ShoppingCart: React.FC = () => {
  const { 
    state, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    closeCart, 
    getTotalPrice,
    getTotalItems 
  } = useApp();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    // This would integrate with payment gateway
    alert('Checkout functionality would integrate with payment gateway (Stripe, PayPal, etc.)');
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      {state.isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        />
      )}
      
      {/* Cart Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-96 bg-background border-l border-border z-50 transform transition-transform duration-300 flex flex-col",
        state.isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            {totalItems > 0 && (
              <Badge variant="secondary">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-4">
                Add some products to get started
              </p>
              <Button onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.cart.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Clear Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
            
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Checkout Button */}
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};