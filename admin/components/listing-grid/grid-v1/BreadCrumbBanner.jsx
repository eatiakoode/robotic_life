import BreadCrumb from "@/components/common/BreadCrumb";
import Image from "next/image";
const BreadCrumbBanner = ({categorydata,locationdata}) => {
  return (
    <section className="residential_commercial inner_page_breadcrumb">
      {categorydata?.logoimage ? (
        <Image
                    width={1920}
                    height={500}
                    className="img-whp w-100 h-100 cover"
                    src={
                      categorydata.logoimage
                        ? `${process.env.NEXT_PUBLIC_API_URL}${categorydata.logoimage}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                    }
                    alt= {`${categorydata.title}`}
                    unoptimized // Optional: disables Next.js image optimization (useful if external images)
                  />
      ) :  
        (<video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
      <source 
      src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/background/frame-video.mp4`}
      type="video/mp4" />
      </video>)
      }
      
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb_content">
              {/* <BreadCrumb title="blog" />
              <h4 className="breadcrumb_title">Blogs</h4> */}
              <h1>{categorydata?.h1title || locationdata?.h1title || ''}</h1>
               <p dangerouslySetInnerHTML={{ __html: categorydata?.description  || locationdata?.description || ''}} />
              {/* <p>{categorydata.description}</p> */}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
