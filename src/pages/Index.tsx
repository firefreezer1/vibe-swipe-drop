import React, { useState } from 'react';
import { SwipeInterface } from '@/components/SwipeInterface';
import { BottomNav } from '@/components/BottomNav';
import { ProductDetail } from '@/components/ProductDetail';
import { EventsInterface } from '@/components/EventsInterface';
import { FriendsInterface } from '@/components/FriendsInterface';
import { NotificationModal } from '@/components/NotificationModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Grid3X3, Users, Bell, User, Sparkles, Search, Settings, Grid, MoreHorizontal } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const renderContent = () => {
    if (selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="relative h-screen bg-background">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-30 glass-bg border-b border-border/30">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-black gradient-primary bg-clip-text text-transparent">
                    StyleSwipe
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gradient-accent text-white border-none">
                    ✨ Discovery Mode
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationModalOpen(true)}
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 gradient-accent rounded-full" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main swipe interface */}
            <div className="absolute inset-0 pt-16 pb-20">
              <SwipeInterface />
            </div>
          </div>
        );

      case 'categories':
        const categories = [
          { id: 'all', name: 'All', emoji: '🔥' },
          { id: 'hoodies', name: 'Hoodies', emoji: '👕' },
          { id: 'tshirts', name: 'T-Shirts', emoji: '👔' },
          { id: 'jackets', name: 'Jackets', emoji: '🧥' },
          { id: 'sneakers', name: 'Sneakers', emoji: '👟' },
          { id: 'jeans', name: 'Jeans', emoji: '👖' },
          { id: 'accessories', name: 'Accessories', emoji: '⌚' },
        ];

        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            {/* Search Bar */}
            <div className="p-4 glass-bg border-b border-border/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products, brands, styles..." 
                  className="pl-9"
                />
              </div>
            </div>

            {/* Horizontal Categories */}
            <div className="p-4 border-b border-border/20">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'gradient-primary text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span>{category.emoji}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="swipe-card p-0 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-4xl">
                      {categories.find(c => c.id === selectedCategory)?.emoji || '👕'}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm">Product {i + 1}</h3>
                      <p className="text-xs text-muted-foreground">Brand Name</p>
                      <p className="text-sm font-bold gradient-primary bg-clip-text text-transparent">$29.99</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="pt-16 pb-20">
            <EventsInterface />
          </div>
        );

      case 'friends':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            <div className="p-6">
              <FriendsInterface />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            {/* Profile Header */}
            <div className="p-6 text-center border-b border-border/20">
              <div className="w-24 h-24 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                U
              </div>
              <h2 className="text-xl font-bold">Your Fashion Profile</h2>
              <p className="text-muted-foreground">@yourhandle</p>
              <p className="text-sm mt-2">Living my best fashion life ✨ #streetwear #minimalist</p>
              
              {/* Stats Row */}
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-center">
                  <p className="text-xl font-bold">127</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">2.4K</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">892</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 gradient-primary text-white">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Profile
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-border/20">
              <Button variant="ghost" className="flex-1 border-b-2 border-primary">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="flex-1">
                <User className="w-4 h-4" />
              </Button>
            </div>

            {/* Posts Grid */}
            <div className="p-2">
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-2xl">
                    👕
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <NotificationModal 
        isOpen={notificationModalOpen} 
        onClose={() => setNotificationModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
