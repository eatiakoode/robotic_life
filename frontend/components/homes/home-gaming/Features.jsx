"use client";

import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({ parentClass = "flat-spacing" }) {
  return (
    <>
      <style jsx>{`
        /* .feature-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
          z-index: 999 !important;
          position: relative !important;
        }
        .feature-card:hover .icon-box {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(192, 199, 229, 0.4) !important;
        } */
        
        .features-responsive {
          margin: 60px 20px !important;
        }
        
        /* Mobile responsive fixes */
        @media (max-width: 575px) {
          .features-responsive {
            margin: 40px 10px !important;
          }
        }
        
        @media (min-width: 576px) and (max-width: 767px) {
          .features-responsive {
            margin: 50px 20px !important;
          }
        }
        
        @media (min-width: 768px) {
          .features-responsive {
            margin: 60px 30px !important;
          }
        }
        
      `}</style>
      <section className={`${parentClass} features-banner features-responsive`} style={{
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '21px',
      boxShadow: '2px 8px 15px rgba(0, 0, 0, 0.08)',
      margin: '60px 20px',
      position: 'relative',
      overflow: 'visible',
      zIndex: 1
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '0 15px' }}>
        <Swiper
          className="swiper tf-sw-iconbox"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 25 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{ 
            clickable: true, 
            el: ".spd2" 
          }}
          dir="ltr"
        >
          {iconboxItems.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div className="tf-icon-box style-2 type-2 type-column feature-card" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: '30px 20px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 10,
                width: '100%'
              }}>
                <div className="icon-box" style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #babbbeff 0%, #96919aff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(192, 199, 229, 0.3)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  <span className={`icon ${item.icon}`} style={{
                    fontSize: '28px',
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }} />
                </div>
                <div className="content" style={{ width: '100%', flex: 1 }}>
                  <h6 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '12px',
                    wordWrap: 'break-word',
                    hyphens: 'auto'
                  }}>{item.title}</h6>
                  <p className="text-secondary" style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    lineHeight: '1.5',
                    margin: '0',
                    wordWrap: 'break-word',
                    hyphens: 'auto'
                  }}>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-iconbox spd2 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
    </>
  );
}
