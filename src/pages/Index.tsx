import React, { useState } from 'react';
import { SwipeInterface } from '@/components/SwipeInterface';
import { BottomNav } from '@/components/BottomNav';
import { ProductDetail } from '@/components/ProductDetail';
import { EventsInterface } from '@/components/EventsInterface';
import { Badge } from '@/components/ui/badge';
import { Grid3X3, Users, Bell, User, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
                <Badge variant="secondary" className="gradient-accent text-white border-none">
                  ✨ Discovery Mode
                </Badge>
              </div>
            </div>

            {/* Main swipe interface */}
            <div className="absolute inset-0 pt-16 pb-20">
              <SwipeInterface />
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Categories</h1>
              <div className="grid grid-cols-2 gap-4">
                {['Hoodies', 'T-Shirts', 'Jackets', 'Sneakers', 'Jeans', 'Accessories'].map((category) => (
                  <div key={category} className="swipe-card p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-4xl mb-2">👕</div>
                    <h3 className="font-semibold">{category}</h3>
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

      case 'notifications':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Notifications</h1>
              <div className="space-y-4">
                <div className="swipe-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 gradient-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Sarah_styles liked your style match!</p>
                      <p className="text-xs text-muted-foreground">2 min ago</p>
                    </div>
                  </div>
                </div>
                <div className="swipe-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 gradient-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">New products matching your vibe are here! 🔥</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="min-h-screen bg-background pt-16 pb-20">
            <div className="p-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  U
                </div>
                <h2 className="text-xl font-bold">Your Fashion Profile</h2>
                <p className="text-muted-foreground">Drip Rating: 🔥🔥🔥🔥⭐</p>
              </div>
              
              <div className="space-y-4">
                <div className="swipe-card p-4">
                  <h3 className="font-semibold mb-2">Your Vibes</h3>
                  <div className="flex flex-wrap gap-2">
                    {['#streetwear', '#minimalist', '#oversized', '#urban'].map((tag) => (
                      <span key={tag} className="gradient-primary text-white px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="swipe-card p-4">
                  <h3 className="font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">127</p>
                      <p className="text-xs text-muted-foreground">Items Liked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold gradient-accent bg-clip-text text-transparent">89</p>
                      <p className="text-xs text-muted-foreground">Style Matches</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold gradient-secondary bg-clip-text text-transparent">23</p>
                      <p className="text-xs text-muted-foreground">Closet Items</p>
                    </div>
                  </div>
                </div>
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
    </div>
  );
};

export default Index;
