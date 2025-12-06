import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get optimized video poster URL with WebP support detection
 * Returns WebP path if browser supports it (97%+ of browsers), otherwise PNG
 * When you convert PNG posters to WebP, this will automatically use the optimized version
 * 
 * @param posterName - Poster filename without extension (e.g., "about-page-hero-video-poster")
 * @returns URL path to the poster image
 */
let webpSupported: boolean | null = null;

function checkWebPSupport(): boolean {
  if (webpSupported !== null) return webpSupported;
  
  if (typeof window === 'undefined') {
    // SSR: assume WebP is supported (modern browsers)
    webpSupported = true;
    return webpSupported;
  }

  // Check WebP support by creating a test image
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return webpSupported;
}

export function getVideoPoster(posterName: string): string {
  const supportsWebP = checkWebPSupport();
  const extension = supportsWebP ? 'webp' : 'png';
  return `/website-photos/${posterName}.${extension}`;
}
