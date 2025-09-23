"use client";
import React from 'react';

// Responsive wrapper component for better mobile experience
const ResponsiveWrapper = ({ 
  children, 
  className = "", 
  mobileClassName = "",
  tabletClassName = "",
  desktopClassName = "",
  breakpoint = "md"
}) => {
  return (
    <div 
      className={`
        ${className}
        ${mobileClassName ? `d-${breakpoint}-none ${mobileClassName}` : ''}
        ${tabletClassName ? `d-none d-${breakpoint}-block d-lg-none ${tabletClassName}` : ''}
        ${desktopClassName ? `d-none d-lg-block ${desktopClassName}` : ''}
      `.trim()}
    >
      {children}
    </div>
  );
};

// Responsive image component with proper sizing
export const ResponsiveImage = ({ 
  src, 
  alt, 
  width = 600, 
  height = 400, 
  className = "",
  priority = false,
  quality = 75
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`img-fluid ${className}`}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
      }}
    />
  );
};

// Touch-friendly button component
export const TouchButton = ({ 
  children, 
  className = "", 
  onClick,
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      type={type}
      className={`touch-target ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        minHeight: '44px',
        minWidth: '44px',
        padding: '12px 20px',
        fontSize: '14px',
        borderRadius: '8px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </button>
  );
};

// Responsive container component
export const ResponsiveContainer = ({ 
  children, 
  className = "",
  fluid = false 
}) => {
  return (
    <div className={`${fluid ? 'container-fluid' : 'container'} ${className}`}>
      <div className="row">
        <div className="col-12">
          {children}
        </div>
      </div>
    </div>
  );
};

// Mobile-first grid component
export const ResponsiveGrid = ({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = "20px",
  className = ""
}) => {
  const getGridClasses = () => {
    let classes = '';
    Object.entries(cols).forEach(([breakpoint, colCount]) => {
      const bp = breakpoint === 'xs' ? '' : `${breakpoint}-`;
      classes += `col-${bp}${12 / colCount} `;
    });
    return classes.trim();
  };

  return (
    <div 
      className={`row g-3 ${className}`}
      style={{ gap: gap }}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={getGridClasses()}>
          {child}
        </div>
      ))}
    </div>
  );
};

// Responsive text component
export const ResponsiveText = ({ 
  children, 
  variant = "body",
  className = "",
  mobile = {},
  tablet = {},
  desktop = {}
}) => {
  const getTextClasses = () => {
    let classes = '';
    
    // Base classes
    switch (variant) {
      case 'h1':
        classes += 'h1 ';
        break;
      case 'h2':
        classes += 'h2 ';
        break;
      case 'h3':
        classes += 'h3 ';
        break;
      case 'h4':
        classes += 'h4 ';
        break;
      case 'h5':
        classes += 'h5 ';
        break;
      case 'h6':
        classes += 'h6 ';
        break;
      case 'small':
        classes += 'small ';
        break;
      default:
        classes += 'text-responsive ';
    }
    
    return classes + className;
  };

  return (
    <div className={getTextClasses()}>
      {children}
    </div>
  );
};

// Responsive visibility component
export const ResponsiveVisibility = ({ 
  children,
  showOn = ['xs', 'sm', 'md', 'lg', 'xl'],
  hideOn = []
}) => {
  const getVisibilityClasses = () => {
    let classes = '';
    
    // Hide on specified breakpoints
    hideOn.forEach(bp => {
      const bpClass = bp === 'xs' ? 'd-none' : `d-${bp}-none`;
      classes += `${bpClass} `;
    });
    
    // Show on specified breakpoints (if not all)
    if (showOn.length < 5) {
      const allBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
      const hideBreakpoints = allBreakpoints.filter(bp => !showOn.includes(bp));
      hideBreakpoints.forEach(bp => {
        const bpClass = bp === 'xs' ? 'd-none' : `d-${bp}-none`;
        classes += `${bpClass} `;
      });
    }
    
    return classes.trim();
  };

  return (
    <div className={getVisibilityClasses()}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;

// Hook for responsive breakpoints
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = React.useState('lg');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 992) {
        setBreakpoint('md');
      } else if (width < 1200) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    isSmallMobile: breakpoint === 'xs',
    isLargeMobile: breakpoint === 'sm',
    isLargeDesktop: breakpoint === 'xl'
  };
};
