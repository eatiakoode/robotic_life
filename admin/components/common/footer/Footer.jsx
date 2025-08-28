'use client'
import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import { useState, useEffect } from "react";
import { getPropertyCompareData } from "@/api/frontend/property";
import Image from "next/image";
import { useCompare } from "@/components/common/footer/CompareContext";
import { addEnquiryAPI } from "@/api/frontend/enquiry";
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from "next/navigation";

const Footer = ({  showBox,setShowBox }) => {
   const [properties, setProperties] = useState([]);
   const [hydrated, setHydrated] = useState(false);
  //  const { propertycompare } = useCompare();
  const { propertycompare, setPropertycompare } = useCompare();
  const [showPopup, setShowPopup] = useState(false);
  
 const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
   const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
      } = useForm();
      const onSubmit = async (data) => {
          // console.log("tests")
          let date = "NA";
          const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    date = formattedDate;
          try {
            
            const payload = {
            ...data,
            subject:"NA",
            message:"NA",
            date:formattedDate, // ✅ manually add the date
          };
          // console.log("tests",payload)
          setShowPopup(false);
           router.push("/thank-you");
            const res = await addEnquiryAPI(payload);
            
            if(res.status=="success"){
              setSuccessmsg(res.message)
              setName("")
              setEmail("")
              setPhone("")
              setSubject("")
              setMessage("")
            }
      
            setError({});
           
          // (Reset other fields here if needed)
        } catch (err) {
          setError({ general: err.message || "Something went wrong" });
        }
        };
  
  const deleteCompareProperty = async (id) => {
    setPropertycompare((old) =>
        old.includes(id) ? old.filter(item => item !== id) : [...old, id]
      );
  };
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    const fetchProperties = async () => {
      if (Array.isArray(propertycompare) && propertycompare?.length > 0) {
        const propertycomparelist = propertycompare.join(",");
        const data = await getPropertyCompareData(propertycomparelist);
        setProperties(data);
      } else {
        setProperties([]); // clear if nothing to show
      }
    };
  
    fetchProperties();
  }, [propertycompare]); // ← add this dependency
  
  // useEffect( () => {
  //     if (propertycompare) {
  //       if (Array.isArray(propertycompare) && propertycompare.length > 0) {       
  //       const fetchProperties = async () => {
  //         const propertycomparelist = propertycompare.join(",");
  //               const data = await getPropertyCompareData(propertycomparelist);
  //               setProperties(data);
  //             };
  //             fetchProperties();
  //         }
  //     }      
  //   }, []);
    // useEffect(() => {
    //   localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
    // }, [propertycompare]);
    useEffect(() => {
      localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
    }, [propertycompare]);

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
    }, []);
    
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <Link href="/" className="navbar_brand dn-smd">
              <Image
                width={170}
                height={75}
                className="logo1 img-fluid"
                // src="/assets/images/logo.svg"
                src="/assets/images/logo.svg"
                alt="image"
              />
          {/* <span>WeGrow</span> */}
          </Link>
          <p>
          we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment.
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Quick Links</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/news-and-insights">News & Insights</Link>
            </li>
            <li>
              <Link href="/terms-conditions">Term & Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Contact Us</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:Info@wegrowinfraventures.com">Info@wegrowinfraventures.com</a>
            </li>
            <li>
             TOWER-2, DLF CORPORATE GREENS, 1205, Southern Peripheral Rd,
            </li>
            <li>
              Sector 74A, Gurugram, Haryana 122004
            </li>
            <li>
              <a href="tel:+91 74219-22000">+91 74219-22000</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Follow us</h4>
          <ul className="mb30">
            <Social />
          </ul>
          <h4>Subscribe</h4>
          <SubscribeForm />
        </div>
      </div>
      <div className="compare_properties">
        <div
          className="compare_wrapper"
          onMouseEnter={() => setShowBox(true)}
          onMouseLeave={() => setShowBox(false)}
        >
          {/* Always render with d-none during SSR */}
          <div
            className={`compare_section row ${
              hydrated ? (showBox ? "d-flex" : "d-none") : "d-none"
            }`}
          >
            {properties.length === 0 && (
              <span className="text-danger">Add for compare</span>
            )}

            {properties.map((item) => (
              <div className="item col-4" key={item._id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCompareProperty(item._id);
                  }}
                >
                  <span className="flaticon-close"></span>
                </a>

                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={
                    item.featuredimageurl
                      ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                      : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                  }
                  alt={`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
                  unoptimized
                />
                <Link href={`/property-detail/${item.slug}`} className="fp_price">
                  {item.price}
                </Link>
                <p className="text-thm">{item.title}</p>
              </div>
            ))}
          </div>

          {/* <div
            className={`countcompare ${
              hydrated && properties.length > 0 ? "d-flex" : "d-none"
            }`}
          >
            <Link href={`/compare`} className="countcomparelink">
              Compare ({propertycompare?.length || 0})
            </Link>
          </div> */}
           {hydrated && properties.length > 0 && (
            <div className="countcompare d-flex">
              <Link href={`/compare`} className="countcomparelink">
                Compare ({propertycompare?.length || 0})
              </Link>
            </div>
          )}
        </div>
      </div>  
      {/* Popup Modal */}
     <div className={`form_grid modal fade ${showPopup ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
  <div className="contact_form modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      
      {/* Left: Image Side */}
      <div className="modal-image-side">
        <img src="/assets/images/buildings.webp" alt="Image" className="img-fluid"/>
      </div>

      {/* Right: Form Side */}
      <div className="modal-form-side">
        <button type="button" className="btn-close" onClick={() => setShowPopup(false)} aria-label="Close"></button>
        <h5 className="modal-title">Get in Touch</h5>
        <div className="modal-body">
          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   alert("Form submitted!");
            //   setShowPopup(false);
            // }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <label className="form-label">Name</label>
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
            <div className="mb-3">
              <label className="form-label">Email</label>
               <input
              id="form_email"
              // name="form_email"
              className="form-control email"
              // required="required"
              type="email"
              placeholder="Email"
              // value={email} onChange={(e) => setEmail(e.target.value)}
             {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
              
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
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
             <button type="submit"  disabled={isSubmitting}  className="btn btn-lg btn-thm w-100">{isSubmitting ? 'Sending...' : 'Submit'}</button>
            
          </form>
        </div>
      </div>

    </div>
  </div>
</div>



    </>
  );
};

export default Footer;
