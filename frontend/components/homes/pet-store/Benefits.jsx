"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faBookOpen, faFlask, faUsers } from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    icon: faRobot,
    text: "Latest updates on new and upcoming robots.",
  },
  {
    icon: faBookOpen,
    text: "Educational content that makes robotics easy to understand.",
  },
  {
    icon: faFlask,
    text: "Research-backed knowledge and authentic information.",
  },
  {
    icon: faUsers,
    text: "A platform for learners, educators, and robotics enthusiasts.",
  },
];

export default function Benefits() {
  return (
    <div className="wg-benefit">
      <div className="container">
        <Swiper
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          dir="ltr"
          className="swiper tf-sw-iconbox"
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <div className="benefit-item">
                <div className="icon-box">
                  <FontAwesomeIcon icon={benefit.icon} size="2x" />
                </div>
                <p className="text-caption-1">{benefit.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
