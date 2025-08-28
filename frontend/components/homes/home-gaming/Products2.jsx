"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { useRobots } from "@/hooks/useRobots";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

export default function Products2() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
  const { robots, loading, error } = useRobots();

  // Helper function to map color names to CSS classes
  const getColorClass = (colorName) => {
    if (!colorName) return 'bg-primary';
    
    const colorMap = {
      'red': 'bg-red',
      'blue': 'bg-blue', 
      'green': 'bg-success',
      'yellow': 'bg-yellow',
      'orange': 'bg-orange',
      'purple': 'bg-purple',
      'pink': 'bg-pink',
      'brown': 'bg-brown',
      'grey': 'bg-grey',
      'gray': 'bg-grey',
      'black': 'bg-black',
      'white': 'bg-white',
      'beige': 'bg-beige',
      'light blue': 'bg-light-blue',
      'light green': 'bg-light-green',
      'light pink': 'bg-light-pink',
      'dark blue': 'bg-dark-blue',
      'dark grey': 'bg-dark-grey'
    };
    
    const normalizedName = colorName.toLowerCase().trim();
    return colorMap[normalizedName] || `bg-${normalizedName.replace(/\s+/g, '-')}`;
  };

  // Transform robot data to match ProductCard1 expected format
  const transformedRobots = robots.map(robot => ({
    id: robot._id,
    title: robot.title,
    price: parseFloat(robot.totalPrice) || 0, // Only totalPrice, no old price
    imgSrc: robot.images && robot.images.length > 0 
      ? (robot.images[0].startsWith('http') 
          ? robot.images[0] 
          : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${robot.images[0].startsWith('/') ? robot.images[0] : `/${robot.images[0]}`}`)
      : '/images/placeholder-robot.svg',
    imgHover: robot.images && robot.images.length > 1 
      ? (robot.images[1].startsWith('http') 
          ? robot.images[1] 
          : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${robot.images[1].startsWith('/') ? robot.images[1] : `/${robot.images[1]}`}`)
      : robot.images && robot.images.length > 0 
        ? (robot.images[0].startsWith('http') 
            ? robot.images[0] 
            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${robot.images[0].startsWith('/') ? robot.images[0] : `/${robot.images[0]}`}`)
        : '/images/placeholder-robot.svg',
    colors: robot.color && robot.color.length > 0 ? robot.color.map(color => ({
      bgColor: getColorClass(color.name),
      colorName: color.name || 'Unknown',
      imgSrc: robot.images && robot.images.length > 0 
        ? (robot.images[0].startsWith('http') 
            ? robot.images[0] 
            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${robot.images[0].startsWith('/') ? robot.images[0] : `/${robot.images[0]}`}`)
        : '/images/placeholder-robot.svg'
    })) : (robot.images && robot.images.length > 0 ? [{
      bgColor: 'bg-primary',
      colorName: 'Default',
      imgSrc: robot.images[0].startsWith('http')
        ? robot.images[0]
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${robot.images[0].startsWith('/') ? robot.images[0] : `/${robot.images[0]}`}`
    }] : []),
    slug: robot.slug,
    isOnSale: false,
    salePercentage: 0,
    sizes: [],
    countdown: null,
    hotSale: false
  }));

  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="heading-section-2 type-2 wow fadeInUp">
            <h3 className="heading font-5 fw-bold">Features Product</h3>
<<<<<<< HEAD
            <Link href={`/shop-filter-canvas`} className="btn-line">
=======
            <Link href={`/shop-collection`} className="btn-line">
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
              View All Products
            </Link>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="heading-section-2 type-2 wow fadeInUp">
            <h3 className="heading font-5 fw-bold">Features Product</h3>
<<<<<<< HEAD
            <Link href={`/shop-filter-canvas`} className="btn-line">
=======
            <Link href={`/shop-collection`} className="btn-line">
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
              View All Products
            </Link>
          </div>
          <div className="text-center py-5">
            <p className="text-danger">Error loading products: {error}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

<<<<<<< HEAD
>>>>>>> ea24ee4 (Home page & admin panel fixed)
=======
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 type-2 wow fadeInUp">
          <h3 className="heading font-5 fw-bold">Features Product</h3>
          <Link href={`/shop-filter-canvas`} className="btn-line">
            View All Products
          </Link>
        </div>
        {transformedRobots.length > 0 ? (
          <Swiper
            dir="ltr"
            className="swiper tf-sw-collection"
            breakpoints={{
              0: { slidesPerView: 1 },
              575: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            spaceBetween={15}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd27",
            }}
          >
            {transformedRobots.map((robot, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <ProductCard1 isNotImageRatio product={robot} />
              </SwiperSlide>
            ))}

            <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd27" />
          </Swiper>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
