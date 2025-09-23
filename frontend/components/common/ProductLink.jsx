import Link from 'next/link';
import { useState } from 'react';

const ProductLink = ({ href, className, children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`${className} ${isHovered ? 'hovered' : ''}`}
      prefetch={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'all 0.2s ease-in-out',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        ...props.style
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ProductLink;
