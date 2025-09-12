"use client";

import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({ parentClass = "flat-spacing" }) {
  return (
    <>
      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
          z-index: 20 !important;
        }
        .feature-card:hover .icon-box {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(192, 199, 229, 0.4) !important;
        }
        
        
      `}</style>
      <section className={`${parentClass} features-banner`} style={{
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '10px',
      boxShadow: '2px 8px 15px rgba(0, 0, 0, 0.08)',
      margin: '80px 45px',
      position: 'relative',
      overflow: 'visible',
      zIndex: 1
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '0 15px' }}>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-iconbox"
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd2",
          }}
          style={{ overflow: 'visible' }}
        >
          {iconboxItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box style-2 type-2 type-column feature-card" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: '30px 20px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                // cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 10
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
                  transition: 'all 0.3s ease'
                }}>
                  <span className={`icon ${item.icon}`} style={{
                    fontSize: '28px',
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }} />
                </div>
                <div className="content">
                  <h6 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '12px'
                  }}>{item.title}</h6>
                  <p className="text-secondary" style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    lineHeight: '1.5',
                    margin: '0'
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
