import Image from "next/image";

const PropertyLocation = ({property}) => {
  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          <div className="gmap_canvas ">
          <div dangerouslySetInnerHTML={{ __html: property?.mapembedcode }} />

            {/* <iframe
              title="map"
              className="gmap_iframe"
              src="https://www.google.com/maps/d/embed?mid=1tJl0-uRax4AKBfbh1eLPLX5WzOk&hl=en&ehbc=2E312F"
            ></iframe> */}
          </div>
        </div>
        <div className="overlay_icon">
          <a href="#">
            <Image
              width={40}
              height={45}
              className="map_img_icon"
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}public/assets/images/header-logo.png`}
              alt="header-logo.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
