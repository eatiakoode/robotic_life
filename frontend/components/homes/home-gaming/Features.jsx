"use client";

import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({ parentClass = "flat-spacing" }) {
  return (
    <section className={`${parentClass} features-banner`} style={{
      background: 'linear-gradient(135deg, #f0f3f5a6 0%, #e9ecef 50%, #dee2e6 100%)',
      backgroundAttachment: 'fixed',
      border: '1px solid #c1c1c1ff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(27, 26, 26, 0.33)',
      margin: '80px 48px',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
            el: ".spd2",
          }}
        >
          {iconboxItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box style-2 type-2 type-column">
                <div className="icon-box">
                  <span className={`icon ${item.icon}`} />
                </div>
                <div className="content">
                  <h6>{item.title}</h6>
                  <p className="text-secondary">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-iconbox spd2 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
