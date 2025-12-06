import { useEffect, useRef } from "react";

/**
 * Hook to lazy load video elements using Intersection Observer
 * Changes preload from "none" to "auto" when video is near viewport
 * @param enabled - Whether lazy loading is enabled (default: true)
 * @param rootMargin - Margin around root to trigger loading (default: "100px")
 */
export function useLazyVideo(enabled: boolean = true, rootMargin: string = "200px") {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!enabled || !videoRef.current) return;

    const video = videoRef.current;
    
    // Only lazy load if preload is set to "none"
    if (video.preload !== "none") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.preload === "none") {
            // Start loading the video when it's near the viewport
            video.preload = "auto";
            video.load(); // Force browser to start loading
            observer.disconnect(); // Stop observing once loading starts
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01, // Trigger when just 1% is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin]);

  return videoRef;
}
