import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  total?: number;
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  className?: string;
}

export function StarRating({
  total = 5,
  value,
  onChange,
  size = 'md',
  readOnly = false,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleMouseOver = (index: number) => {
    if (readOnly) return;
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index);
  };

  return (
    <div 
      className={cn('flex', className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(total)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = (hoverValue || value) >= ratingValue;
        
        return (
          <Star
            key={index}
            className={cn(
              sizes[size],
              'cursor-pointer transition-all duration-100',
              isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              readOnly && 'cursor-default'
            )}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
}