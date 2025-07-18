import React, { useState } from 'react';
import { Bell, X, Heart, MessageCircle, UserPlus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    icon: Heart,
    message: 'Sarah_styles liked your style match!',
    time: '2 min ago',
    unread: true
  },
  {
    id: 2,
    type: 'comment',
    icon: MessageCircle,
    message: 'Jordan commented on your hoodie post',
    time: '5 min ago',
    unread: true
  },
  {
    id: 3,
    type: 'friend',
    icon: UserPlus,
    message: 'Alex Rivera sent you a friend request',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 4,
    type: 'shop',
    icon: ShoppingBag,
    message: 'New products matching your vibe are here! 🔥',
    time: '2 hours ago',
    unread: false
  },
  {
    id: 5,
    type: 'like',
    icon: Heart,
    message: 'Maya_vibes and 12 others liked your fit',
    time: '1 day ago',
    unread: false
  }
];

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute top-4 right-4 w-80 sm:w-96 max-w-[calc(100vw-2rem)] max-h-96 glass-bg border border-border/50 rounded-2xl shadow-elegant animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="gradient-accent text-white border-none">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Mark all as read */}
        {unreadCount > 0 && (
          <div className="p-2 border-b border-border/30">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="w-full text-primary hover:bg-primary/10"
            >
              Mark all as read
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-64 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id} 
                className={`p-4 border-b border-border/20 hover:bg-muted/50 cursor-pointer transition-colors ${
                  notification.unread ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'like' ? 'bg-red-500/20 text-red-500' :
                    notification.type === 'comment' ? 'bg-blue-500/20 text-blue-500' :
                    notification.type === 'friend' ? 'bg-green-500/20 text-green-500' :
                    'bg-purple-500/20 text-purple-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 gradient-primary rounded-full mt-2" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 text-center">
          <Button variant="ghost" size="sm" className="text-primary">
            View all notifications
          </Button>
        </div>
      </div>
    </div>
  );
}