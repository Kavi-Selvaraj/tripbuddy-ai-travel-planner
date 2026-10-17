import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { UNIVERSAL_FALLBACK_IMAGE } from '../data/destinationImages';

export interface DestinationImageProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Resolves local public asset paths with Vite BASE_URL to support
 * root deployments (Vercel) and repository sub-paths (GitHub Pages).
 */
export const resolveImagePath = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Convert root-relative paths e.g. /images/coorg.jpg
  if (url.startsWith('/') && !url.startsWith('//')) {
    const baseUrl = import.meta.env.BASE_URL || '/';
    return baseUrl === '/' ? url : `${baseUrl.replace(/\/$/, '')}${url}`;
  }
  return url;
};

/**
 * Production-ready DestinationImage component:
 * - Meaningful alt attributes for accessibility
 * - Appropriate object-fit: cover styling
 * - Responsive image sizing with customizable sizes attribute
 * - Lazy loading for below-the-fold images; eager loading for hero/above-the-fold
 * - Multi-stage graceful fallback: primary -> specific fallback -> universal fallback -> styled accessible card
 * - Prevents layout shift (CLS) via consistent container dimensions and smooth transitions
 */
export const DestinationImage: React.FC<DestinationImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  aspectRatioClass,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => resolveImagePath(src));
  const [fallbackStage, setFallbackStage] = useState<number>(0);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const initial = resolveImagePath(src);
    setCurrentSrc(initial);
    setFallbackStage(0);
    setIsFailed(!initial);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    const resolvedFallback = resolveImagePath(fallbackSrc);

    if (fallbackStage === 0 && resolvedFallback && resolvedFallback !== currentSrc) {
      // Stage 1: Try specific fallbackSrc
      setFallbackStage(1);
      setCurrentSrc(resolvedFallback);
      setIsLoaded(false);
    } else if (fallbackStage <= 1 && UNIVERSAL_FALLBACK_IMAGE && currentSrc !== UNIVERSAL_FALLBACK_IMAGE) {
      // Stage 2: Try verified universal CDN fallback
      setFallbackStage(2);
      setCurrentSrc(UNIVERSAL_FALLBACK_IMAGE);
      setIsLoaded(false);
    } else {
      // Stage 3: All network sources exhausted; render styled accessible card
      setIsFailed(true);
      setIsLoaded(true);
    }
  };

  const safeAlt = alt?.trim() || 'Scenic travel destination';

  if (!currentSrc || isFailed) {
    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE5DC] to-[#DDD6CB] text-[#1E4D3A] p-4 text-center select-none ${aspectRatioClass || ''}`}
        role="img"
        aria-label={safeAlt}
      >
        <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-2 shadow-xs">
          <Compass className="w-5 h-5 text-[#1E4D3A] opacity-80 stroke-[1.75]" />
        </div>
        <span className="text-xs font-semibold text-[#1E2923] max-w-[85%] line-clamp-2 leading-tight">
          {safeAlt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass || 'w-full h-full'}`}>
      {/* Background skeleton placeholder to prevent cumulative layout shift */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-[#EAE5DC] animate-pulse" 
          aria-hidden="true" 
        />
      )}
      <img
        src={currentSrc}
        alt={safeAlt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// Export as ImageWithFallback for backward compatibility
export const ImageWithFallback = DestinationImage;
