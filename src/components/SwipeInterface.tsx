import React, { useState, useRef, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { CommentModal } from './CommentModal';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Import product images
import productHoodie from '@/assets/product-hoodie.jpg';
import productJacket from '@/assets/product-jacket.jpg';
import productTshirt from '@/assets/product-tshirt.jpg';
import productSneakers from '@/assets/product-sneakers.jpg';

interface Product {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    image: productHoodie,
    brand: 'UrbanVibes',
    name: 'Oversized Purple Hoodie',
    price: 2499,
  },
  {
    id: '2',
    image: productJacket,
    brand: 'StreetCore',
    name: 'Vintage Denim Jacket',
    price: 3299,
  },
  {
    id: '3',
    image: productTshirt,
    brand: 'MinimalFit',
    name: 'Essential White Tee',
    price: 899,
  },
  {
    id: '4',
    image: productSneakers,
    brand: 'StepUp',
    name: 'Urban Runner Sneakers',
    price: 4999,
  },
];

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(mockProducts);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentProduct = cards[currentIndex];
  const nextProduct = cards[currentIndex + 1];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    // Show feedback message
    const messages = {
      left: ['Not your style 👎', 'Maybe next time', 'Skip it!'],
      right: ['Added to wishlist! 💝', 'Great choice!', 'Matched taste with 14 others! 🔥']
    };
    
    const randomMessage = messages[direction][Math.floor(Math.random() * messages[direction].length)];
    
    toast({
      description: randomMessage,
      duration: 2000,
    });

    // Remove current card and move to next
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset to beginning or load more products
        setCurrentIndex(0);
        setCards([...mockProducts]); // In real app, fetch new products
      }
      setSwipeDirection(null);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - (rect.top + rect.height / 2);

    setDragOffset({ x: deltaX, y: deltaY });

    // Show swipe indicators
    const threshold = 80;
    if (Math.abs(deltaX) > threshold) {
      const likeIndicator = document.getElementById(`like-${currentProduct?.id}`);
      const saveIndicator = document.getElementById(`save-${currentProduct?.id}`);
      
      if (deltaX > 0 && saveIndicator) {
        saveIndicator.style.opacity = '1';
        likeIndicator && (likeIndicator.style.opacity = '0');
      } else if (deltaX < 0 && likeIndicator) {
        likeIndicator.style.opacity = '1';
        saveIndicator && (saveIndicator.style.opacity = '0');
      }
    } else {
      const likeIndicator = document.getElementById(`like-${currentProduct?.id}`);
      const saveIndicator = document.getElementById(`save-${currentProduct?.id}`);
      likeIndicator && (likeIndicator.style.opacity = '0');
      saveIndicator && (saveIndicator.style.opacity = '0');
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 120;
    if (Math.abs(dragOffset.x) > threshold) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
    
    // Hide indicators
    const likeIndicator = document.getElementById(`like-${currentProduct?.id}`);
    const saveIndicator = document.getElementById(`save-${currentProduct?.id}`);
    likeIndicator && (likeIndicator.style.opacity = '0');
    saveIndicator && (saveIndicator.style.opacity = '0');
  };

  const cardTransform = isDragging
    ? `translate(${dragOffset.x}px, ${dragOffset.y * 0.1}px) rotate(${dragOffset.x * 0.1}deg)`
    : swipeDirection
    ? `translateX(${swipeDirection === 'left' ? '-100vw' : '100vw'}) rotate(${swipeDirection === 'left' ? '-15deg' : '15deg'})`
    : 'translate(0px, 0px) rotate(0deg)';

  if (!currentProduct) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No more products!</h2>
          <p className="text-muted-foreground">Check back later for new arrivals</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background card (next product) */}
      {nextProduct && (
        <div className="absolute inset-0 scale-95 opacity-80">
          <ProductCard
            {...nextProduct}
            className="animate-bounce-in"
          />
        </div>
      )}

      {/* Current card */}
      <div
        ref={cardRef}
        className={cn(
          "absolute inset-0 cursor-grab active:cursor-grabbing",
          swipeDirection && (swipeDirection === 'left' ? 'animate-swipe-left' : 'animate-swipe-right')
        )}
        style={{
          transform: cardTransform,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onMouseMove={(e) => {
          if (!isDragging) return;
          const rect = cardRef.current?.getBoundingClientRect();
          if (!rect) return;
          const centerX = rect.left + rect.width / 2;
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - (rect.top + rect.height / 2);
          setDragOffset({ x: deltaX, y: deltaY });
        }}
        onMouseUp={() => {
          if (!isDragging) return;
          setIsDragging(false);
          const threshold = 120;
          if (Math.abs(dragOffset.x) > threshold) {
            handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
          }
          setDragOffset({ x: 0, y: 0 });
        }}
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
          }
        }}
      >
        <ProductCard
          {...currentProduct}
          onLike={() => handleSwipe('right')}
          onSave={() => handleSwipe('right')}
          onComment={() => setCommentModalOpen(true)}
        />
      </div>

      {/* Swipe hint */}
      {currentIndex === 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
          <p className="text-white/60 text-sm font-medium">
            Swipe left to skip • Swipe right to save
          </p>
        </div>
      )}

      {/* Comment Modal */}
      <CommentModal
        isOpen={commentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        productId={currentProduct?.id || ''}
        productName={currentProduct?.name || ''}
      />
    </div>
  );
}