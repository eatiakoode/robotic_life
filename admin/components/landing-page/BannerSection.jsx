'use client'
// import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { addLandingEnquiryAPI } from "@/api/frontend/landingenquiry";

export default function BannerSection({landingpage}) {
  // const [form, setForm] = useState({ name: '', email: '', phone: '' });
  // const [errors, setErrors] = useState({});
  // const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      reset,
    } = useForm();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};
  //   if (!form.name.trim()) newErrors.name = 'Full Name Is Required';
  //   if (!form.email.trim()) newErrors.email = 'Email Is Required';
  //   if (!form.phone.trim()) newErrors.phone = 'Phone number Is Required';

  //   setErrors(newErrors);
  //   if (Object.keys(newErrors).length === 0) {
  //     // Handle form submission (API call or similar)
  //     setSubmitted(true);
  //   }
  // };
  const onSubmit = async (data) => {
      try {
       
        // data.append("landingpageid", landingpage._id);
        data.landingpageidnew=landingpage._id
        data.landingpageid=landingpage._id
        // Send data to backend here
        const res = await addLandingEnquiryAPI(data);
        router.push("/thank-you");
        // onUnlock();
        reset();
      } catch (error) {
        console.error('Submission error:', error);
      }
    };

  return (
    <section className="banner-two" id="homein">
      <div
        className="banner-two_image"
        // style={{ backgroundImage: 'url(/assets/images/slide1.webp)' }}
        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${landingpage.bannerimage || '/assets/images/slide1.webp'})` }}

      ></div>
      <div className="container">
        <div className="banner-two_content">
          <div className="banner-two_content-inner">
            <div className="banner-two_title">{landingpage.bannertitle}</div>
            <h1 className="banner-two_heading">
            <div dangerouslySetInnerHTML={{ __html: landingpage?.bannerdescription }} />
              
            </h1>

            <div className="banner-tabs">
              <div className="prod-tabs tabs-box">
                <ul className="tab-btns tab-buttons clearfix">
                  <li className="tab-btn active-btn">Enquire Now</li>
                </ul>

                <div className="tabs-content">
                  <div className="tab active-tab" id="prod-buy">
                    <div className="content">
                    <div className="default-form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                    {/* <input type="hidden" name="landingpageid" value={landingpage._id} {...register('landingpageid')} /> */}
                        <div className="row clearfix bannerform">
                          <div className="col-lg-4 col-md-4 col-sm-6 form-group">
                          <input
                              type="text"
                              placeholder="Full Name"
                              // required
                              // value={formData.name}
                              // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              {...register('name', { required: 'Name is required' })}
                            />
                            
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            {/* <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              value={form.name}
                              onChange={handleChange}
                            />
                            {errors.name && (
                              <span className="error" style={{ color: 'red', marginTop: 5 }}>
                                {errors.name}
                              </span>
                            )} */}
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 form-group">
                          <input
                              type="email"
                              placeholder="Email"
                              // required
                              // value={formData.email}
                              // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: 'Invalid email address',
                                },
                              })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            {/* <input
                              type="text"
                              name="email"
                              placeholder="Email Address"
                              value={form.email}
                              onChange={handleChange}
                            />
                            {errors.email && (
                              <span className="error" style={{ color: 'red', marginTop: 5 }}>
                                {errors.email}
                              </span>
                            )} */}
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                          <input
                              type="text"
                              placeholder="Phone"
                              // required
                              // value={formData.phone}
                              // onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: 'Enter a valid 10-digit phone number',
                                },
                              })}
                              maxLength={10}
                            />
                            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            {/* <input
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              maxLength={10}
                              value={form.phone}
                              onChange={handleChange}
                            />
                            {errors.phone && (
                              <span className="error" style={{ color: 'red', marginTop: 5 }}>
                                {errors.phone}
                              </span>
                            )} */}
                          </div>
                        </div>
                        <div className="button-box">
                        
                          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : ' Connect Now'}                           
                          </button>
                        </div>
                        {isSubmitSuccessful && (
                          <p className="text-green-600 mt-2">Your message has been sent successfully!</p>
                        )}
                        {/* {submitted && (
                          <div id="landing_form_massage1" style={{ marginTop: 10, color: 'green' }}>
                            Thank you for your enquiry!
                          </div>
                        )} */}
                      </form>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-amenities">
              <div dangerouslySetInnerHTML={{ __html: landingpage?.bannerreview }} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

