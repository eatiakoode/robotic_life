import BreadCrumb from "@/components/common/BreadCrumb";
import Image from "next/image";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb">
       <Image
          width={1920}
          height={500}
          className="img-whp w-100 h-100 cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/background/about-us.webp`}
          unoptimized // Optional: disables Next.js image optimization (useful if external images)
        />
      {/* <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
    <source 
    // src="/assets/images/background/frame-video.mp4"
    src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/background/frame-video.mp4`}
     type="video/mp4" />
  </video> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="about us" />
              <h4 className="breadcrumb_title">About Us</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
