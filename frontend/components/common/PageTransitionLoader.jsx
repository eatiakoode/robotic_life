"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PageTransitionLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route changes
    const handleRouteChange = () => {
      handleStart();
      // Simulate loading time
      setTimeout(handleComplete, 300);
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  useEffect(() => {
    // Reset loading state when pathname changes
    setIsLoading(false);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div 
      className="page-transition-loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: '#007bff',
        zIndex: 9999,
        animation: 'loading 1s ease-in-out infinite'
      }}
    >
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PageTransitionLoader;
