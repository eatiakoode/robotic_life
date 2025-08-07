import Image from "next/image";
import HeroFilter from "./HeroFilter";

const Hero = () => {
  return (
    <section className="home-one home1-overlay home1_bgi1">

      <div className="video-wrapper d-none d-md-block">
        <video
          className="desktop-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/background/myvideo-compressed.mp4`} type="video/mp4" />
          {/* Your browser does not support the video tag. */}
        </video>
      </div>

      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <HeroFilter />
          </div>
        </div>
      </div>
      {/* End .container */}

      <div className="mouse_scroll">
        <a href="#feature-property">
          {/* <div className="icon">
            <h4>Scroll Down</h4>
            <p>to discover more</p>
          </div> */}
          <div className="thumb">
            <i className="flaticon-download-arrow"></i>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
