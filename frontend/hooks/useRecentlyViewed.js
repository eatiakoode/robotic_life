import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'recentlyViewedRobots';
const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      // Load recently viewed from localStorage on mount
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewedIds(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.warn('Error parsing recently viewed from localStorage:', error);
      setRecentlyViewedIds([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const addToRecentlyViewed = useCallback((productId) => {
    if (!productId || typeof window === 'undefined') return;

    console.log('➕ Adding product to recently viewed:', productId);

    setRecentlyViewedIds(prev => {
      // Remove if already exists
      const filtered = prev.filter(id => id !== productId);
      // Add to beginning
      const updated = [productId, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      
      console.log('📝 Updated recently viewed IDs:', updated);
      
      try {
        // Save to localStorage
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
        console.log('💾 Saved to localStorage');
      } catch (error) {
        console.warn('Error saving to localStorage:', error);
      }
      
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewedIds([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(RECENTLY_VIEWED_KEY);
      } catch (error) {
        console.warn('Error clearing localStorage:', error);
      }
    }
  }, []);

  return {
    recentlyViewedIds,
    addToRecentlyViewed,
    clearRecentlyViewed,
    isInitialized
  };
};

