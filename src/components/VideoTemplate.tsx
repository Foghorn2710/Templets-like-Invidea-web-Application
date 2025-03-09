
import { useState } from 'react';
import { Play, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface VideoTemplateProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  isNew?: boolean;
  isPremium?: boolean;
  onClick: (id: string) => void;
  isSelected?: boolean;
  index?: number;
}

const VideoTemplate = ({
  id,
  title,
  description,
  thumbnailUrl,
  category,
  duration,
  isNew = false,
  isPremium = false,
  onClick,
  isSelected = false,
  index = 0
}: VideoTemplateProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationDelay = 100 + (index * 50);

  return (
    <div 
      className="animate-fade-in opacity-0"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div 
        className={cn(
          "group relative rounded-xl overflow-hidden border transition-all duration-300",
          isSelected 
            ? "border-primary/50 shadow-accent" 
            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-medium"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => onClick(id)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Hover overlay with play button */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300",
              isHovering ? "opacity-100" : "opacity-0"
            )}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full h-12 w-12"
            >
              <Play size={20} fill="white" />
            </Button>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            {duration}
          </div>
          
          {/* New badge */}
          {isNew && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              New
            </div>
          )}
          
          {/* Premium badge */}
          {isPremium && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
              Premium
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg truncate">{title}</h3>
            {isSelected && (
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-3">{description}</p>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTemplate;
