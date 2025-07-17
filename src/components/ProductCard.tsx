import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  liked?: boolean;
  saved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
  onComment?: () => void;
  className?: string;
}

export function ProductCard({
  id,
  image,
  brand,
  name,
  price,
  liked = false,
  saved = false,
  onLike,
  onSave,
  onComment,
  className,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isSaved, setIsSaved] = useState(saved);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className={cn("swipe-card w-full h-full relative overflow-hidden", className)}>
      {/* Product Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={`${brand} ${name}`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        {/* Top section with brand badge */}
        <div className="flex justify-between items-start">
          <div className="glass-bg px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white/90">{brand}</span>
          </div>
          <div className="flex items-center gap-1 glass-bg px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-white/90">4.8</span>
          </div>
        </div>

        {/* Bottom section with product info and actions */}
        <div className="flex justify-between items-end">
          {/* Product info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-2xl font-black text-white gradient-primary bg-clip-text text-transparent">
              ₹{price.toLocaleString()}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={handleLike}
              className={cn(
                "action-button",
                isLiked && "gradient-accent"
              )}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  isLiked ? "text-white fill-current" : "text-white/70"
                )}
              />
            </button>

            <button
              onClick={onComment}
              className="action-button"
            >
              <MessageCircle className="w-5 h-5 text-white/70" />
            </button>

            <button
              onClick={handleSave}
              className={cn(
                "action-button",
                isSaved && "gradient-secondary"
              )}
            >
              <Bookmark
                className={cn(
                  "w-5 h-5 transition-colors",
                  isSaved ? "text-white fill-current" : "text-white/70"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Swipe indicators (hidden by default, shown during gesture) */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-0 transition-opacity duration-200" id={`like-${id}`}>
        <div className="gradient-accent p-4 rounded-full glow-accent">
          <Heart className="w-8 h-8 text-white fill-current" />
        </div>
      </div>

      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-0 transition-opacity duration-200" id={`save-${id}`}>
        <div className="gradient-secondary p-4 rounded-full glow-primary">
          <Bookmark className="w-8 h-8 text-white fill-current" />
        </div>
      </div>
    </div>
  );
}