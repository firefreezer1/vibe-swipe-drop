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
              <div className="flex items-center justify-between mobile-container">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl lg:text-2xl font-black gradient-primary bg-clip-text text-transparent">
                    StyleSwipe
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gradient-accent text-white border-none text-xs sm:text-sm">
                    ✨ Discovery Mode
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationModalOpen(true)}
                    className="relative touch-target"
                  >
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 gradient-accent rounded-full" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main swipe interface */}
            <div className="absolute inset-0 pt-16 pb-20 lg:pb-0 lg:pt-20">
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
          <div className="min-h-screen bg-background pt-16 pb-20 lg:pb-0 lg:pt-20">
            {/* Search Bar */}
            <div className="mobile-container glass-bg border-b border-border/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search products, brands, styles..." 
                  className="pl-9 sm:pl-11 mobile-text"
                />
              </div>
            </div>

            {/* Horizontal Categories */}
            <div className="mobile-container border-b border-border/20">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 whitespace-nowrap touch-target ${
                      selectedCategory === category.id 
                        ? 'gradient-primary text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{category.emoji}</span>
                    <span className="text-xs sm:text-sm">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="mobile-container">
              <div className="mobile-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="swipe-card p-0 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                      {categories.find(c => c.id === selectedCategory)?.emoji || '👕'}
                    </div>
                    <div className="p-2 sm:p-3">
                      <h3 className="font-semibold text-xs sm:text-sm">Product {i + 1}</h3>
                      <p className="text-xs text-muted-foreground">Brand Name</p>
                      <p className="text-sm sm:text-base font-bold gradient-primary bg-clip-text text-transparent">$29.99</p>
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
          <div className="min-h-screen bg-background pt-16 pb-20 lg:pb-0 lg:pt-20">
            <div className="mobile-container">
              <FriendsInterface />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20 lg:pb-0 lg:pt-20">
            {/* Profile Header */}
            <div className="mobile-container text-center border-b border-border/20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                U
              </div>
              <h2 className="mobile-heading font-bold">Your Fashion Profile</h2>
              <p className="text-muted-foreground mobile-text">@yourhandle</p>
              <p className="mobile-text mt-2">Living my best fashion life ✨ #streetwear #minimalist</p>
              
              {/* Stats Row */}
              <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12 mt-6">
                <div className="text-center">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">127</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">2.4K</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">892</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Following</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 mb-6">
                <Button className="flex-1 gradient-primary text-white touch-target">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1 touch-target">
                  Share Profile
                </Button>
                <Button variant="outline" size="icon" className="touch-target">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-border/20">
              <Button variant="ghost" className="flex-1 border-b-2 border-primary touch-target">
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" className="flex-1 touch-target">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Posts Grid */}
            <div className="p-2 sm:p-4">
              <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl lg:text-3xl">
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
