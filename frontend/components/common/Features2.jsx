"use client";
import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features2({ parentClass = "flat-spacing" }) {
  return (
    <section className={`${parentClass} robotic-features-section`}>
      <div className="container">
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
            el: ".spd3",
          }}
        >
          {iconboxItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box style-2 robotic-card">
                <div className="icon-box robotic-icon">
                  <span className={`icon ${item.icon}`} />
                </div>
                <div className="content">
                  <h6>{item.title}</h6>
                  <p className="text-secondary">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-iconbox spd3 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>

      <style jsx>{`
        .robotic-features-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #404040 50%, #2d2d2d 75%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }

        .robotic-features-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(64, 144, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(64, 144, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(128, 128, 128, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .robotic-card {
          background: linear-gradient(145deg, #2a2a2a, #1e1e1e);
          border: 1px solid #404040;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .robotic-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(64, 144, 255, 0.5), transparent);
        }

        .robotic-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(64, 144, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          border-color: #4090ff;
        }

        .robotic-icon {
          background: linear-gradient(135deg, #3a3a3a, #2a2a2a);
          border: 2px solid #404040;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .robotic-card:hover .robotic-icon {
          border-color: #4090ff;
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(64, 144, 255, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.15);
        }

        .robotic-icon .icon {
          color: #b0b0b0;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .robotic-card:hover .robotic-icon .icon {
          color: #4090ff;
          text-shadow: 0 0 8px rgba(64, 144, 255, 0.5);
        }

        .robotic-card h6 {
          color: #ffffff;
          margin-bottom: 12px;
          font-weight: 600;
          font-size: 18px;
        }

        .robotic-card .text-secondary {
          color: #b0b0b0 !important;
          line-height: 1.6;
          font-size: 14px;
        }

        .sw-pagination-iconbox .swiper-pagination-bullet {
          background: #404040;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .sw-pagination-iconbox .swiper-pagination-bullet-active {
          background: #4090ff;
          opacity: 1;
          box-shadow: 0 0 10px rgba(64, 144, 255, 0.5);
        }

        /* Additional robotic effects */
        .robotic-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #888888, #d0d0d0, #888888);
          border-radius: 12px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .robotic-card:hover::after {
          opacity: 0.2;
        }

        /* Subtle animation for a tech feel */
        @keyframes pulse {
          0% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8); }
          50% { box-shadow: 0 4px 25px rgba(120, 120, 120, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9); }
          100% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8); }
        }

        .robotic-card {
          animation: pulse 4s ease-in-out infinite;
        }

        .robotic-card:nth-child(2n) {
          animation-delay: 1s;
        }

        .robotic-card:nth-child(3n) {
          animation-delay: 2s;
        }

        .robotic-card:hover {
          animation: none;
        }
      `}</style>
    </section>
  );
}