'use client'
// import Comments from "../blog-details/Comments";
// import Ratings from "../blog-details/Ratings";
// import ReviewBox from "../blog-details/ReviewBox";
// import AdditionalDetails from "../common/listing-details/AdditionalDetails";
import { useState } from "react";
// import Attachments from "../common/listing-details/Attachments";
import FloorPlans from "../common/listing-details/FloorPlans";
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import PropertyFeatures from "../common/listing-details/PropertyFeatures";
import PropertyItem from "../common/listing-details/PropertyItem";
import PropertyLocation from "../common/listing-details/PropertyLocation";
import PropertyFAQ from "../common/listing-details/PropertyFAQ";
import Link from "next/link";

// import PropertyVideo from "../common/listing-details/PropertyVideo";
// import WalkScore from "../common/listing-details/WalkScore";
// import WhatsNearby from "../common/listing-details/WhatsNearby";

import Image from "next/image";

import { addBrochureEnquiryAPI } from "@/api/frontend/brochureenquiry";
import { useRouter, useParams } from "next/navigation";
import { useForm } from 'react-hook-form';

const DetailsContent = ({property,faqs,propertydetail}) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [showIframe, setShowIframe] = useState(false);

  function stripHtml(html) {
    return html?.replace(/<[^>]*>/g, '');
  }

  const shareUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL+'property-detail/'+property.slug;
const text = encodeURIComponent(property.metatitle);
const hashtags = property.metatitle;

// const [email, setEmail] = useState("");
  const [error, setError] = useState("");
   const [successmsg, setSuccessmsg] = useState("");
    const router = useRouter();
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      reset,
    } = useForm();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };
  const onSubmit = async (data) => {
     
      try {
        const payload = {
        ...data,
        propertyid:property._id, // ✅ manually add the date
      };
       router.push("/thank-you");
        const res = await addBrochureEnquiryAPI(payload);
        if(res.status=="success"){
          setSuccessmsg(res.message)
          setName("")
          setPhone("")
          setShowIframe(true);
        }
  
        setError({});
       
      // (Reset other fields here if needed)
    } catch (err) {
      setError({ general: err.message || "Something went wrong" });
    }
    };
    return (
    <>
      <div className="share_flex listing_single_description">
        <div className="lsd_list">
          <PropertyItem property={property}/>
                  <div className="share_btn h1ads_1st_list half_style dn-991 map-half-style position-relative">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="navbered w-100">
                            <div className="mega-dropdown home2">
                              <span
                                id="show_advbtn"
                                className="dropbtn"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                              >
                                Share
                              </span>

                              <div className="dropdown-content dropdown-menu ">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <ul className="sub-menu">
                                      <li>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank"><i className="fa fa-facebook"></i> Facebook</a>
                                      </li>
                                      <li>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank"><i className="fa fa-linkedin"></i> Linkedin</a>
                                      </li>
                                      <li>
                                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}&hashtags=${hashtags}`} target="_blank"><i className="fa fa-x-twitter"></i> Twitter</a>
                                      </li>
                                       <li>
                                        <a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i> Instagram</a>
                                      </li>
                                    </ul>
                                  </div>
                                 
                                </div>
                                {/* End .row */}
                              </div>
                              {/* End .dropdown-menu */}
                            </div>
                          </div>
                          {/* End .advance filter button */}
                        </div>
                        {/* End .col */}
                        {/* End .col */}
                      </div>
                      {/* End .row */}
                    </div>
        </div>
        {/* End .lsd_list */}

        <h4 className="mb30">Description</h4>
        <PropertyDescriptions property={property} propertydetail={propertydetail}/>
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails property={property} />
        </div>
      </div>
      {/* End .additional_details */}

      {/* <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Additional details</h4>
          </div>
          <AdditionalDetails />
        </div>
      </div> */}
      {/* End .additional_details */}

      {/* <div className="property_attachment_area">
        <h4 className="mb30">Property Attachments</h4>
        <div className="iba_container style2">
          <Attachments />
        </div>
      </div> */}
      {/* End .property_attachment_area */}

      <div className="amenities application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">Amenities</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures property={property}/>
        </div>
      </div>
      {/* End .feature_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">
          Location{" "}
          <small className="float-end">
          {property.address}, {property.locationid?.title}, {property.cityid?.title}
          </small>
        </h4>
        <div className="property_video p0">
          <PropertyLocation  property={property}/>
        </div>
      </div>
      {/* End .location_area */}
      

{property.floorplan?.length > 0 && (
      <div className="application_statics mt30">
        <h4 className="mb30">Floor plans</h4>
        <div className="faq_according style2">
          <FloorPlans property={property}/>
        </div>
      </div>
     
    )}
     {/* End .floor_plane */}
     {property?.videoembedcode && (
      <div className="application_statics iframe-video shop_single_tab_content style2 mt30">
      <h4 className="mb30"> Property video</h4>
      <div dangerouslySetInnerHTML={{ __html: property?.videoembedcode }} />
      </div>
)}
      {/* <div className="shop_single_tab_content style2 mt30">
        <PropertyVideo />
      </div> */}
      {property?.siteplanurl && (
      <div className="application_statics mt30">
      <h4 className="mb10">Site Plan</h4>
        <div
          className={`education_distance mb15`}
        >
        <Image
                    width={343}
                    height={220}
                    className="img-whp w-100 h-100 cover"
                    src={
                      property.siteplanurl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${property.siteplanurl.url?property.siteplanurl.url:property.siteplanurl}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                    }
                    alt= {`${property.siteplanurl.name?property.siteplanurl.name:property.title}`}
                    unoptimized // Optional: disables Next.js image optimization (useful if external images)
                  />
        </div>
      </div>
      )}

      
       {property?.masterplanurl && (
      <div className="application_statics mt30">
      <h4 className="mb10">Master Plan</h4>
        <div
          className={`education_distance mb15`}
        >
        <Image
                    width={343}
                    height={220}
                    className="img-whp w-100 h-100 cover"
                    src={
                      property.masterplanurl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${property.masterplanurl.url?property.masterplanurl.url:property.masterplanurl}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                    }
                    alt= {`${property.masterplanurl.name?property.masterplanurl.name:property.title}`}
                    unoptimized // Optional: disables Next.js image optimization (useful if external images)
                  />
        </div>
      </div>
      )}
      {/* End property-video  */}

      {/* <div className="walkscore_area mt30">
        <WalkScore />
      </div> */}
      {/* End walkscore_area */}
      {property?.nearby && (
      <div className="whats_nearby mt30">
        <h4 className="mb10">What&apos;s Nearby</h4>
        <div
          className={`education_distance mb15`}
        ><div dangerouslySetInnerHTML={{ __html: property?.nearby }} /></div>
        {/* <WhatsNearby  property={property}/> */}
      </div>
      )}
      {/* End what's nearby area */}
      {/* <div className="property_attachment_area mt30">
    <h4 className="mb30">Property Brochure</h4>
    <div className="iba_container style2">
      <iframe src="/assets/images/51_Property_Law.pdf" frameborder="0"></iframe>
      <a
        href="/assets/images/51_Property_Law.pdf"
        target="_blank"
        className="icon_box_area style2 d-flex align-items-center"
        style={{ textDecoration: 'none' }}
      >
        <div className="score">
          <span className="flaticon-pdf text-thm fz30"></span>
        </div>
        <div className="details">
          <h5 className="mb-0">
            <span className="flaticon-download text-thm pr10"></span> Property Details Doc
          </h5>
        </div>
      </a>
    </div>
  </div> */}
{property?.brochurepdf && (
  <div className="property_attachment_area mt30">
    <h4 className="mb30">Property Brochure</h4>
    <div className="iba_container style2">
      <button
        className="icon_box_area style2 d-flex align-items-center"
        style={{ textDecoration: 'none', border: 'none', background: 'none', cursor: 'pointer' }}
        onClick={() => setShowPdfModal(true)}
      >
        <div className="score">
          <span className="flaticon-pdf text-thm fz30"></span>
        </div>
        <div className="details">
          <h5 className="mb-0">
            <span className="flaticon-view text-thm pr10"></span> View Property Details Doc
          </h5>
        </div>
      </button>
    </div>

    {/* Modal */}
    {showPdfModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button
            onClick={() => {
              setShowPdfModal(false);
              setShowIframe(false);
              setName('');
              setPhone('');
            }}
           className="cancel-btn">
            <span className="flaticon-close"></span>
          </button>

          {!showIframe ? (
            // Form section
            <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   if (name && phone) {
              //     setShowIframe(true);
              //   } else {
              //     alert("Please enter both name and phone number");
              //   }
              // }}
              onSubmit={handleSubmit(onSubmit)}
              className="p-3"
            >
              <h5 className="mb-3">Enter your details to view brochure</h5>
              <div className="mb-2">
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                /> */}
                <input
              id="form_name"
              name="form_name"
              className="form-control"
              // required="required"
              type="text"
              placeholder="Name"
              // value={name} onChange={(e) => setName(e.target.value)}
              {...register('name', { required: 'Name is required' })}
            />
            
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
              </div>
              <div className="mb-2">
                  <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              // required="required"
              type="phone"
              placeholder="Phone"
             {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number must be 10 digits',
                },
                minLength: {
                  value: 10,
                  message: 'Phone number must be 10 digits',
                },
              })}
              maxLength={10}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
              </div>
              <button type="submit">
                Submit & View Brochure
              </button>
            </form>
          ) : (
            // PDF iframe section
            <iframe
              src={`${process.env.NEXT_PUBLIC_API_URL}${property.brochurepdf}`}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          )}
        </div>
      </div>
    )}
  </div>
)}


{property?.specifications && (
  <div className="property_attachment_area mt30">

  <div className="project_spec property_attachment_area mt30">
    <h4 className="mb30">Project Specifications</h4>
    <div className="iba_container style2" dangerouslySetInnerHTML={{ __html: property?.specifications }}>
    {/* <section  /> */}
        {/* <div>
          <h5>Living/Dining</h5>
          <div className="score">
            <ul>
              <li><span>Vitrified Tiles</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h5>Master Bedroom</h5>
          <div className="score">
            <ul>
              <li><span>Vitrified Tiles</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h5>Kitchen</h5>
          <div className="score">
            <ul>
              <li><span>Modular Kitchen</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h5>Balcony</h5>
          <div className="score">
            <ul>
              <li><span>Vitrified Tiles</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h5>Toilets</h5>
          <div className="score">
            <ul>
              <li><span>Vitrified Tiles</span></li>
            </ul>
          </div>
        </div> */}
    </div>
  </div>
  </div>
)}
  
  {property?.builderid && (
      <div className="application_statics mt30">
        <h4 className="mb10">About Builder</h4>
      <div className="director-desk mt-0 pt-0">
                      {/* <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                          <div className="main-title text-center">
                            <h2 className="mt0 color-main">Who We Are</h2>
                            <h2 className="mt0 mb0">Committed to Excellence</h2>
                          </div>
                        </div>
                      </div> */}
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="who-we-are">
                            <Image
                                width={1600}
                                height={1066}
                                className="img-fluid rounded-2"
                                src={
                                  property.builderid?.logoimage
                                    ? `${process.env.NEXT_PUBLIC_API_URL}${property.builderid?.logoimage}`
                                    : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                                }
                                alt= {`${property.builderid?.title}`}
                                unoptimized
                                />
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="who-we-are">
                            <div className="main-title text-left mb-2">
                              <h4>{property.builderid?.title}</h4>
                             
                            </div>
                           
                            <p>{stripHtml(property.builderid?.description)?.slice(0, 500)}</p>
                              
                              {showFullBio && (
                                  <>
                                    <p>
                                      
                                    {stripHtml(property.builderid?.description).slice(501, 15000)}
                                    </p>
                                    
                                  </>
                                )}
                                <div className="view-all" style={{position:'static',transform:'none'}}>
                                    {/* <button
                                      className="btn btn-primary"
                                      onClick={() => setShowFullBio(!showFullBio)}
                                    >
                                      {showFullBio ? "Read Less" : "Read More"}
                                    </button> */}
                                    
                                     <Link href={`/builder/${property.builderid?.slug}`} className="btn btn-primary">
                                     Read More
                                              </Link>
                                </div>
                                
                          </div>
                        </div>
                      </div>
                  </div>
                  </div>
 )}
      {faqs?.length > 0 && (
      <div className="application_statics mt30">
        <h4 className="mb30">FAQ</h4>
        <div className="faq_according style2">
          <PropertyFAQ faqs={faqs}/>
        </div>
      </div>
      )}
    </>
  );
};

export default DetailsContent;
