'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import { useCompare } from "@/components/common/footer/CompareContext";


export default function ListingOne({property,setPropertySelectedComp, setShowBox,propertyimage }) {
  const { propertycompare, setPropertycompare } = useCompare();
  const addCompareProperty = async (id) => {
    
      
    const isExist = propertycompare.includes(id);
  
    if (isExist) {
      alert("Already added for compare");
    } else if (propertycompare.length >= 3) {
      alert("You have already selected 3 products");
    } else {
      setPropertycompare((old) => [...old, id]);
      setShowBox(true);
    }
  };
  return (
    
    <section className="property_detaill_view listing-title-area mt85 md-mt0">
    <div className="container">
      <Gallery>
        <div className="row mb30">
          <div className="col-lg-7 col-xl-8">
            <div className="single_property_title d-flex justify-content-between align-items-center mt30-767">
              <div>
                <h2>{property?.title}</h2>
                <p>{property.address}, {property.locationid?.title}, {property.cityid?.title}</p>
              </div>
              <div>
                <a href={`tel:${property?.sellerphone}`} className="circle-shape text-dark d-inline-block me-2">
                  <span className="flaticon-telephone"></span>
                </a>
                <a href={`mailto:${property?.selleremail}`} className="circle-shape text-dark d-inline-block">
                  <span className="flaticon-black-back-closed-envelope-shape"></span>
                </a>
              </div>
                
            </div>
           
          </div>
          <div className="col-lg-5 col-xl-4">
            <div className="single_property_social_share position-static transform-none">
              <div className="price float-start fn-400">
                <h2>
                  {property?.price}
                  {/* <small>/mo</small> */}
                </h2>
                <p>Best value in the area!</p>
              </div>

              <div className="spss style2 text-end tal-400">
                <ul className="mb0">
                  <li className="list-inline-item">
                  <a href="#" className="tooltip-icon" data-tooltip="Compare" onClick={(e) => {
                e.preventDefault();
                addCompareProperty(property._id);
              }}>
                <span className="flaticon-transfer-1"></span>
              </a>
                  </li>
                  {/* <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-heart"></span>
                    </a>
                  </li> */}
                  {/* <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-share"></span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-printer"></span>
                    </a>
                  </li> */}
                </ul>
              </div>
              {/* End activity and social sharing */}
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="row">
          <div className="col-sm-7 col-lg-8">
            <div className="row">
              <div className="col-lg-12">
                <div className="spls_style_two mb30-520">
                <Item
                      original={`${process.env.NEXT_PUBLIC_API_URL}${property?.featuredimageurl.url?property?.featuredimageurl.url:property?.featuredimageurl}`}
                      thumbnail={`${process.env.NEXT_PUBLIC_API_URL}${property?.featuredimageurl.url?property?.featuredimageurl.url:property?.featuredimageurl}`}
                      width={752}
                      height={450}
                    >

                    {({ ref, open }) => (
                      <div role="button" ref={ref} onClick={open}>
                        <Image
                          width={752}
                          height={450}
                          className="img-fluid w100 cover lds-1"
                          src={
                            property.featuredimageurl
                              ? `${process.env.NEXT_PUBLIC_API_URL}${property.featuredimageurl}`
                              : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                          }
                          alt= {`${property.title}`}
                          unoptimized // Optional: disables Next.js image optimization (useful if external images)
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </div>
            </div>
          </div>
          {/* End .col-sm-7 .col-lg-8 */}

          <div className="col-sm-5 col-lg-4">
            <div className="property_box row">
              {propertyimage?.map((val, index) => (
                <div className="col-6" key={index}>
                  <div className="spls_style_two img-gallery-box mb24">
                    <Item
                       original={`${process.env.NEXT_PUBLIC_API_URL}${val.image?.url?val.image?.url:val.image}`}
                      thumbnail={`${process.env.NEXT_PUBLIC_API_URL}${val.image?.url?val.image?.url:val.image}`}
                      width={752}
                      height={450}
                    >
                      {({ ref, open }) => (
                        <div role="button" ref={ref} onClick={open}>
                          <Image
                            width={170}
                            height={133}
                            className="img-fluid w100 cover"
                            src={
                              val.image
                                ? `${process.env.NEXT_PUBLIC_API_URL}${val.image?.url?val.image?.url:val.image}`
                                : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                            }
                            alt= {`${val.image?.name?val.image?.name:property.title}`}
                            unoptimized 
                           
                          />
                        </div>
                      )}
                    </Item>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End  col-sm-5 col-lg-4 */}
        </div>
        {/* End .row */}
      </Gallery>
    </div>
  </section>
  )
}
