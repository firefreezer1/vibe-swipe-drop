import React, { useState, useRef } from 'react';
import { X, Send, Image, Video, Camera, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

interface Comment {
  id: string;
  text: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  timestamp: Date;
  user: string;
}

export function CommentModal({ isOpen, onClose, productId, productName }: CommentModalProps) {
  const [commentText, setCommentText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'Just received mine! Quality is amazing 🔥',
      user: 'fashion_lover',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Perfect fit! Here\'s how it looks on me',
      media: { type: 'image', url: '/placeholder-comment-image.jpg' },
      user: 'style_guru',
      timestamp: new Date(Date.now() - 7200000),
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        description: "File size too large. Please choose a file under 10MB.",
        duration: 3000,
      });
      return;
    }

    // Check file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast({
        description: "Please select an image or video file.",
        duration: 3000,
      });
      return;
    }

    setSelectedMedia(file);
    setMediaType(isImage ? 'image' : 'video');
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setSelectedMedia(null);
    setMediaPreview(null);
    setMediaType(null);
  };

  const handleSubmit = () => {
    if (!commentText.trim() && !selectedMedia) {
      toast({
        description: "Please add some text or media to your comment.",
        duration: 2000,
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      media: selectedMedia ? {
        type: mediaType!,
        url: mediaPreview!
      } : undefined,
      user: 'You',
      timestamp: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
    removeMedia();
    
    toast({
      description: "Comment posted! 🎉",
      duration: 2000,
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md h-[80vh] bg-background rounded-t-3xl border border-border/50 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-bg border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Comments</h2>
              <p className="text-sm text-muted-foreground">{productName}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="rounded-full w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="swipe-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {comment.user[0].toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">
                      {comment.user}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                  
                  {comment.text && (
                    <p className="text-sm text-foreground mb-2">{comment.text}</p>
                  )}
                  
                  {comment.media && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                      {comment.media.type === 'image' ? (
                        <img
                          src={comment.media.url}
                          alt="Comment attachment"
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="relative">
                          <video
                            src={comment.media.url}
                            className="w-full h-32 object-cover"
                            controls
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="sticky bottom-0 glass-bg border-t border-border/50 p-4">
          {/* Media Preview */}
          {mediaPreview && (
            <div className="mb-3 relative">
              <div className="relative rounded-lg overflow-hidden">
                {mediaType === 'image' ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-full h-20 object-cover"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    className="w-full h-20 object-cover"
                    muted
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeMedia}
                  className="absolute top-1 right-1 w-6 h-6 p-0 bg-black/50 hover:bg-black/70 rounded-full"
                >
                  <X className="w-3 h-3 text-white" />
                </Button>
              </div>
            </div>
          )}

          {/* Input Row */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="border-border/50 focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            
            {/* Media Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 p-0 rounded-full"
            >
              <Camera className="w-4 h-4" />
            </Button>
            
            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!commentText.trim() && !selectedMedia}
              className="w-10 h-10 p-0 rounded-full gradient-primary"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}