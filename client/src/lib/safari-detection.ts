import { useState, useEffect } from 'react';

/**
 * Detects Safari (including iOS Safari)
 * Uses feature detection rather than user agent sniffing
 */
export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent;
  const isSafariUA = /^((?!chrome|android).)*safari/i.test(ua);
  const hasSafariVendor = navigator.vendor?.indexOf('Apple') > -1;
  
  // Safari on iOS
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isChromeOnIOS = isIOS && /CriOS/.test(ua);
  
  return (isSafariUA || (hasSafariVendor && 'WebkitAppearance' in document.documentElement.style)) && !isChromeOnIOS;
}

/**
 * Hook to detect Safari in React components
 */
export function useIsSafari(): boolean {
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);
  
  useEffect(() => {
    setIsSafariBrowser(isSafari());
  }, []);
  
  return isSafariBrowser;
}

