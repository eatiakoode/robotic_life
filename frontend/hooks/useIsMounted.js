import { useState, useEffect } from 'react';

/**
 * Custom hook to prevent hydration mismatches by ensuring
 * certain effects only run on the client side
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

/**
 * Hook to conditionally apply animation classes only on client side
 * This prevents hydration mismatches with WOW.js animations
 */
export const useAnimationClasses = (baseClasses = '', animationClasses = 'wow fadeInUp') => {
  const isMounted = useIsMounted();
  
  return `${baseClasses} ${isMounted ? animationClasses : ''}`.trim();
};
