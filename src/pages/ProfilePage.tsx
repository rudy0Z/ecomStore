import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, ShoppingBag, Heart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';

export const ProfilePage: React.FC = () => {
  const { state, login, logout, updateUser, addToCart, removeFromWishlist } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    street: state.user?.address?.street || '',
    city: state.user?.address?.city || '',
    state: state.user?.address?.state || '',
    zipCode: state.user?.address?.zipCode || '',
    country: state.user?.address?.country || ''
  });

  // Mock login for demo
  const handleMockLogin = () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    };
    login(mockUser);
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      street: mockUser.address.street,
      city: mockUser.address.city,
      state: mockUser.address.state,
      zipCode: mockUser.address.zipCode,
      country: mockUser.address.country
    });
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (state.user) {
      setFormData({
        name: state.user.name,
        email: state.user.email,
        phone: state.user.phone || '',
        street: state.user.address?.street || '',
        city: state.user.address?.city || '',
        state: state.user.address?.state || '',
        zipCode: state.user.address?.zipCode || '',
        country: state.user.address?.country || ''
      });
    }
    setIsEditing(false);
  };

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 3
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Processing',
      total: 149.99,
      items: 1
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'Shipped',
      total: 89.99,
      items: 2
    }
  ];

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="p-8 text-center">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Welcome to EliteStore</h1>
              <p className="text-muted-foreground mb-6">
                Sign in to access your profile, orders, and wishlist.
              </p>
              <Button onClick={handleMockLogin} className="w-full mb-4">
                Sign In (Demo)
              </Button>
              <p className="text-sm text-muted-foreground">
                Demo mode - Click to sign in with mock data
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={state.user?.avatar} />
                      <AvatarFallback className="text-lg">
                        {state.user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">{state.user?.name}</h1>
                      <p className="text-muted-foreground">{state.user?.email}</p>
                    </div>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ShoppingBag className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${order.total}</div>
                          <Badge variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'Shipped' ? 'secondary' : 'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                {state.wishlist.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground">Start adding products you love!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.wishlist.map((product) => (
                      <Card key={product.id} className="p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${product.price}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => addToCart(product)}>
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeFromWishlist(product.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Payment Methods</h3>
                      <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Notifications</h3>
                      <p className="text-sm text-muted-foreground">Configure email and push notifications</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Button variant="destructive" onClick={logout}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};