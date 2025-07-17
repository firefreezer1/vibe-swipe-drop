import React, { useState } from 'react';
import { ArrowLeft, Heart, Share, ShoppingBag, Zap, Play, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductDetailProps {
  product: {
    id: string;
    image: string;
    brand: string;
    name: string;
    price: number;
  };
  onBack: () => void;
}

const mockReviews = [
  {
    id: '1',
    user: 'Sarah_styles',
    avatar: '👩‍🦰',
    rating: 5,
    comment: 'Obsessed with this hoodie! Perfect fit and so comfy 🔥',
    likes: 127,
    isVideo: true
  },
  {
    id: '2',
    user: 'alex_fits',
    avatar: '👨',
    rating: 5,
    comment: 'Quality is amazing, wearing it everywhere now!',
    likes: 89,
    isVideo: false
  },
  {
    id: '3',
    user: 'fashion_nova',
    avatar: '👩',
    rating: 4,
    comment: 'Love the color but runs a bit large',
    likes: 45,
    isVideo: true
  }
];

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-bg border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="rounded-full w-10 h-10 p-0"
            >
              <Heart className={cn("w-5 h-5", isLiked && "text-red-500 fill-current")} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full w-10 h-10 p-0"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Image/Video */}
      <div className="relative aspect-[3/4] bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Trending badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 gradient-accent px-3 py-1 rounded-full">
            <Zap className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">Trending</span>
          </div>
        </div>

        {/* Boost badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 gradient-secondary px-3 py-1 rounded-full">
            <Users className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">247 Boosts</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.8 (2.1k)</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-3xl font-black gradient-primary bg-clip-text text-transparent">
            ₹{product.price.toLocaleString()}
          </p>
        </div>

        {/* Size selector */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Size</h3>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-colors",
                  selectedSize === size
                    ? "gradient-primary text-white border-transparent"
                    : "border-border text-muted-foreground hover:border-primary"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button className="w-full gradient-primary text-white font-semibold py-3 rounded-xl">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Closet
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 font-semibold py-3 rounded-xl">
              <Zap className="w-4 h-4 mr-2" />
              Boost This Fit
            </Button>
            <Button className="flex-1 gradient-accent text-white font-semibold py-3 rounded-xl">
              Buy Now
            </Button>
          </div>
        </div>

        {/* Reviews section */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">Real Reviews</h3>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="swipe-card p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{review.user}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      {review.isVideo && (
                        <div className="flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-full">
                          <Play className="w-2 h-2 text-primary" />
                          <span className="text-xs text-primary font-medium">Video</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                    
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{review.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}