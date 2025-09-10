"use client";
import React from "react";

export default function Media({ product }) {
  // Handle both field name variations (videoEmbedCode from backend model, videoembedcode from admin form)
  const videoEmbedCode = product?.videoEmbedCode || product?.videoembedcode;
  
  return (
    <div className="tab-media">
      {videoEmbedCode ? (
        <div className="media-content">
                     <h4 className="mb-3">Robot Review</h4>
          <div 
            className="video-container"
            style={{
              position: 'relative',
              width: '100%',
              height: '0',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
                         <div 
               dangerouslySetInnerHTML={{ __html: videoEmbedCode }}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
          <p className="text-muted mt-3">
            Watch this video to learn more about this robot's features and capabilities.
          </p>
        </div>
      ) : (
        <div className="no-media">
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="fas fa-video" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            </div>
            <h5 className="text-muted">No Media Available</h5>
            <p className="text-muted">
              There are no videos available for this product at the moment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
