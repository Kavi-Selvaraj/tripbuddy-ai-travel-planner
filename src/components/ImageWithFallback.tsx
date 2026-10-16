import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectRatioClass
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE5DC] to-[#DDD6CB] text-[#1E4D3A] p-4 text-center ${aspectRatioClass || ''}`}
      >
        <Compass className="w-8 h-8 mb-2 opacity-50 stroke-[1.5]" />
        <span className="text-xs font-medium text-[#1E2923]/70 max-w-[80%] line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass || 'w-full h-full'}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EAE5DC] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
