import Image from "next/image";

const FloorPlans = ({property}) => {
  return (
    <div className="accordion" id="accordionExample">
      {property.floorplan?.slice(0, 38).map((singleItem,index) => (
      <div className="card floor_plan" key={singleItem._id}>
        <div id={`heading${index}`}>
          <h2 className="mb-0">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              <ul className="mb0 d-flex align-items-cener flex-wrap">
                {singleItem?.title && singleItem?.title !== "undefined" && (
                  <li className="d-inline-flex list-inline-item">{singleItem?.title} &nbsp; &nbsp; </li> 
                  )}
                  {singleItem?.areasize && singleItem?.areasize !== "undefined" &&   (
                <li className="d-inline-flex list-inline-item">
                  <p>Size: &nbsp; </p> <span>{singleItem?.areasize}</span> &nbsp;&nbsp; 
                </li> 
                )}
                  {singleItem?.bedroom && singleItem?.bedroom != "undefined" &&  (
                <li className="d-inline-flex list-inline-item">
                  <p>Type : &nbsp; </p> <span>{singleItem?.bedroom}</span> &nbsp;&nbsp;
                </li> 
                )}
                {/* <li className="d-inline-flex list-inline-item">
                  <p>Baths:</p> <span>530 Sqft</span>
                </li> */}
                
                  {singleItem?.price && singleItem?.price !== "undefined" && (
                <li className="d-inline-flex list-inline-item">
                  <p>Price: &nbsp;</p> <span>{singleItem?.price}</span>
                </li>
                )}
              </ul>
            </button>
          </h2>
        </div>
        <div
          id={`collapse${index}`}
          className="collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#accordionExample"
        >
          <div className="card-body text-center">
            <Image
              width={619}
              height={465}
              className="img-fluid w-100 h-100 cover"
              src={
                singleItem.planimageurl
                  ? `${process.env.NEXT_PUBLIC_API_URL}${singleItem.planimageurl}`
                  : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
              }
              alt= {`${singleItem.title}${index + 1}`}
              unoptimized 
            />
            {singleItem?.description && singleItem?.description !== "undefined" && (
               <p>
            {singleItem.description}
            </p>
            )}
          </div>
        </div>
      </div>
       ))}
      {/* <div className="card floor_plan">
        <div className=" active" id="headingTwo">
          <h2 className="mb-0">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <ul className="mb0 d-flex align-items-cener flex-wrap">
                <li className="d-inline-flex list-inline-item">First Floor</li>
                <li className="d-inline-flex list-inline-item">
                  <p>Size:</p> <span>1267 Sqft</span>
                </li>
                <li className="d-inline-flex list-inline-item">
                  <p>Rooms:</p> <span>670 Sqft</span>
                </li>
                <li className="d-inline-flex list-inline-item">
                  <p>Baths:</p> <span>530 Sqft</span>
                </li>
                <li className="d-inline-flex list-inline-item">
                  <p>Price:</p> <span>$1489</span>
                </li>
              </ul>
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          className="collapse show"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body text-center">
            <Image
              width={619}
              height={465}
              className="img-fluid"
              src="/assets/images/resource/floor_plan.png"
              alt="floor_plan.png"
            />
            <p>
              Plan description. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
              nisl ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FloorPlans;
