"use client";

const ProductDetailSkeleton = () => {
  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Image skeleton */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="product-image-skeleton">
                  <div className="skeleton-image" style={{ 
                    height: '500px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '8px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                </div>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="col-md-6">
              <div className="tf-product-content">
                <div className="skeleton-text" style={{
                  height: '24px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div className="skeleton-text" style={{
                  height: '20px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  width: '60%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div className="skeleton-text" style={{
                  height: '32px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  width: '40%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div className="skeleton-text" style={{
                  height: '48px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div className="skeleton-text" style={{
                  height: '40px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  width: '30%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ProductDetailSkeleton;
