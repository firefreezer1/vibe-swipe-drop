import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, Check, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

const mockFriendRequests = [
  { id: 1, name: 'Sarah Chen', username: '@sarahstyles', avatar: '👩🏻‍💼', mutualFriends: 12 },
  { id: 2, name: 'Alex Rivera', username: '@alexfits', avatar: '👨🏽‍🎨', mutualFriends: 8 },
  { id: 3, name: 'Maya Patel', username: '@mayavibes', avatar: '👩🏾‍💻', mutualFriends: 5 },
];

const mockFriends = [
  { id: 1, name: 'Jordan Kim', username: '@jordanstyle', avatar: '👨🏻‍💼', online: true, lastMessage: 'Love that hoodie!' },
  { id: 2, name: 'Zoe Martinez', username: '@zoefashion', avatar: '👩🏼‍🎤', online: false, lastMessage: 'Where did you get those sneakers?' },
  { id: 3, name: 'Kai Wong', username: '@kaiwong', avatar: '👨🏻‍🎤', online: true, lastMessage: 'Check out this new drop 🔥' },
];

export function FriendsInterface() {
  const [activeTab, setActiveTab] = useState<'requests' | 'messages'>('requests');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-background">
        {/* Chat Header */}
        <div className="glass-bg border-b border-border/30 p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedChat(null)}
              className="text-muted-foreground"
            >
              ←
            </Button>
            <div className="text-2xl">{selectedChat.avatar}</div>
            <div>
              <h3 className="font-semibold">{selectedChat.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedChat.username}</p>
            </div>
            {selectedChat.online && (
              <div className="w-2 h-2 gradient-primary rounded-full ml-auto"></div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-end">
            <div className="gradient-primary text-white p-3 rounded-2xl rounded-br-md max-w-xs">
              Hey! Saw your latest style post 🔥
            </div>
          </div>
          <div className="flex">
            <div className="bg-muted p-3 rounded-2xl rounded-bl-md max-w-xs">
              {selectedChat.lastMessage}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="glass-bg border-t border-border/30 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" className="gradient-primary text-white">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('requests')}
            className={activeTab === 'requests' ? 'gradient-primary text-white' : ''}
          >
            Requests
            {mockFriendRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1 gradient-accent text-white border-none">
                {mockFriendRequests.length}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('messages')}
            className={activeTab === 'messages' ? 'gradient-primary text-white' : ''}
          >
            Messages
          </Button>
        </div>
      </div>

      {/* Friend Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {mockFriendRequests.map((request) => (
            <div key={request.id} className="swipe-card p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{request.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{request.name}</h3>
                  <p className="text-sm text-muted-foreground">{request.username}</p>
                  <p className="text-xs text-muted-foreground">{request.mutualFriends} mutual friends</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gradient-primary text-white">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search friends..." className="pl-9" />
          </div>

          {mockFriends.map((friend) => (
            <div 
              key={friend.id} 
              className="swipe-card p-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedChat(friend)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-3xl">{friend.avatar}</div>
                  {friend.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 gradient-primary rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{friend.name}</h3>
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{friend.username}</p>
                  <p className="text-xs text-muted-foreground truncate">{friend.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}