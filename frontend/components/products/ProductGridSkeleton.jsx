"use client";

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="tf-grid-layout wrapper-shop tf-col-4 responsive-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-product">
          <div className="card-product-wrapper">
            <div className="product-img">
              <div 
                className="skeleton-image" 
                style={{ 
                  height: '300px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '8px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
            </div>
            <div className="card-product-content">
              <div 
                className="skeleton-text" 
                style={{
                  height: '20px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
              <div 
                className="skeleton-text" 
                style={{
                  height: '16px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  width: '60%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
              <div 
                className="skeleton-text" 
                style={{
                  height: '24px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  width: '40%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProductGridSkeleton;
