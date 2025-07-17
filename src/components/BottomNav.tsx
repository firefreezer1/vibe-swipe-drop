import React from 'react';
import { Home, Grid3X3, Users, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'categories', icon: Grid3X3, label: 'Categories' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-bg border-t border-border/50 px-2 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl transition-all duration-200",
                  "min-w-[60px] relative",
                  isActive
                    ? "gradient-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 gradient-primary rounded-full" />
                )}
                
                <Icon 
                  className={cn(
                    "w-5 h-5 mb-1 transition-transform duration-200",
                    isActive && "scale-110"
                  )} 
                />
                
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute inset-0 glow-subtle rounded-xl" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}