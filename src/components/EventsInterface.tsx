import React, { useState } from 'react';
import { Filter, Search, Calendar, Trophy, Camera, Edit3, Clock, Users, MapPin, Heart, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  type: 'contest' | 'casting' | 'collab';
  brand: {
    name: string;
    logo: string;
    verified: boolean;
  };
  title: string;
  description: string;
  prize: string;
  deadline: Date;
  location?: string;
  participants: number;
  maxParticipants?: number;
  requirements: string[];
  tags: string[];
  image: string;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    type: 'contest',
    brand: {
      name: 'UrbanVibes',
      logo: 'UV',
      verified: true
    },
    title: 'Summer Streetwear Design Challenge',
    description: 'Create the next viral streetwear piece! We\'re looking for bold, innovative designs that capture the essence of urban youth culture.',
    prize: '₹75,000 + Production Deal',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    participants: 247,
    maxParticipants: 500,
    requirements: ['Original design concepts', 'Portfolio submission', '18+ years old'],
    tags: ['streetwear', 'design', 'contest'],
    image: '/placeholder-event-1.jpg',
    isBookmarked: true,
    isLiked: false
  },
  {
    id: '2',
    type: 'casting',
    brand: {
      name: 'StyleForward',
      logo: 'SF',
      verified: true
    },
    title: 'Gen Z Fashion Campaign Models',
    description: 'Looking for diverse, authentic models aged 18-25 for our upcoming "Real Style" campaign. All body types welcome!',
    prize: '₹25,000 per day + Portfolio',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: 'Mumbai, Delhi, Bangalore',
    participants: 89,
    maxParticipants: 100,
    requirements: ['Age 18-25', 'Portfolio/Instagram', 'Available for 3 days'],
    tags: ['modeling', 'campaign', 'fashion'],
    image: '/placeholder-event-2.jpg',
    isBookmarked: false,
    isLiked: true
  },
  {
    id: '3',
    type: 'collab',
    brand: {
      name: 'CreativeStudio',
      logo: 'CS',
      verified: false
    },
    title: 'Content Creator Partnership',
    description: 'Partner with us to create engaging fashion content! Looking for creators with 10K+ followers for long-term collaboration.',
    prize: 'Revenue Share + Free Products',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    participants: 156,
    requirements: ['10K+ followers', 'Fashion niche', 'Weekly content'],
    tags: ['content', 'collaboration', 'influencer'],
    image: '/placeholder-event-3.jpg',
    isBookmarked: false,
    isLiked: false
  }
];

const filterOptions = [
  { id: 'all', label: 'All Events', icon: Calendar },
  { id: 'contest', label: 'Contests', icon: Trophy },
  { id: 'casting', label: 'Casting', icon: Camera },
  { id: 'collab', label: 'Collabs', icon: Edit3 }
];

export function EventsInterface() {
  const [events, setEvents] = useState(mockEvents);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.type === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleBookmark = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isBookmarked: !event.isBookmarked }
        : event
    ));
    toast({
      description: "Event bookmarked! 🔖",
      duration: 2000,
    });
  };

  const handleLike = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked }
        : event
    ));
  };

  const handleApply = (event: Event) => {
    toast({
      description: `Application submitted for ${event.title}! 🎉`,
      duration: 3000,
    });
  };

  const getTimeLeft = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'contest': return Trophy;
      case 'casting': return Camera;
      case 'collab': return Edit3;
      default: return Calendar;
    }
  };

  const getEventEmoji = (type: string) => {
    switch (type) {
      case 'contest': return '🏆';
      case 'casting': return '📸';
      case 'collab': return '🤝';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-bg border-b border-border/30 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Events Hub</h1>
            <p className="text-sm text-muted-foreground">Discover opportunities from top brands</p>
          </div>
          <Badge variant="secondary" className="gradient-accent text-white border-none">
            {filteredEvents.length} Live
          </Badge>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events, brands, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-border/50 focus:border-primary"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                  isActive
                    ? "gradient-primary text-white"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-6">
        {filteredEvents.map((event) => {
          const EventIcon = getEventIcon(event.type);
          const progressPercent = event.maxParticipants 
            ? (event.participants / event.maxParticipants) * 100 
            : 0;

          return (
            <div key={event.id} className="swipe-card overflow-hidden">
              {/* Event Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {event.brand.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{event.brand.name}</span>
                        {event.brand.verified && (
                          <div className="w-4 h-4 gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <EventIcon className="w-3 h-3" />
                        <span className="capitalize">{event.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(event.id)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        event.isLiked ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", event.isLiked && "fill-current")} />
                    </button>
                    <button
                      onClick={() => handleBookmark(event.id)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        event.isBookmarked ? "gradient-secondary text-white" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Bookmark className={cn("w-4 h-4", event.isBookmarked && "fill-current")} />
                    </button>
                  </div>
                </div>

                {/* Event Title */}
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl">{getEventEmoji(event.type)}</span>
                  <h2 className="text-lg font-bold text-foreground flex-1">{event.title}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-foreground">{event.prize}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeLeft(event.deadline)}</span>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {/* Participants Progress */}
                {event.maxParticipants && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Participants</span>
                      <span className="text-foreground font-medium">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 gradient-primary rounded-full" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleApply(event)}
                    className="flex-1 gradient-primary text-white font-semibold py-2 rounded-xl"
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-10 h-10 p-0 rounded-xl"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}