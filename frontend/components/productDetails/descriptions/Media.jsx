"use client";
import React from "react";

export default function Media({ product }) {
  const videoEmbedCode = product?.videoEmbedCode || product?.videoembedcode;
  
  const extractVideoIds = (embedCode) => {
    if (!embedCode) return [];
    
    const youtubeRegex = /src="https?:\/\/(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
    const matches = [];
    let match;
    
    while ((match = youtubeRegex.exec(embedCode)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  };
  
  const createVideoCards = (embedCode) => {
    const videoIds = extractVideoIds(embedCode);
    
    if (videoIds.length === 0) {
      return [{
        id: 'single-video',
        embedCode: embedCode,
        title: 'Robot Demonstration',
        description: 'Watch this video to learn more about this robot\'s features and capabilities.'
      }];
    }
    
    return videoIds.map((videoId, index) => ({
      id: videoId,
      embedCode: `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`,
      title: `Robot Demonstration ${index + 1}`,
      description: 'Watch this video to learn more about this robot\'s features and capabilities.'
    }));
  };
  
  const videoCards = videoEmbedCode ? createVideoCards(videoEmbedCode) : [];
  
  return (
    <div className="tab-media">
      {videoCards.length > 0 ? (
        <div className="media-content">
          {/* <h4 className="mb-4 text-center">Robot Demonstration</h4> */}
          
          <div className={`video-cards-grid ${videoCards.length === 1 ? 'single-video' : 'multiple-videos'}`}>
            {videoCards.map((video, index) => (
              <div key={video.id} className="video-card">
                <div className="video-card-header">
                  <h5 className="video-title">{video.title}</h5>
                </div>
                
                <div 
                  className="video-container"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '0',
                    paddingBottom: '56.25%', 
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                >
                  <div 
                    dangerouslySetInnerHTML={{ __html: video.embedCode }}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-media">
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="fas fa-video" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            </div>
            <h5 className="text-muted">No Media Available</h5>
            <p className="text-muted">
              There are no videos available for this robot at the moment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
