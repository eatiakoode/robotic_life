'use client'
import { useState } from "react";
import { addSubscribeEnquiryAPI } from "@/api/frontend/subscribeenquiry";
import { useRouter, useParams } from "next/navigation";
import { useForm } from 'react-hook-form';
const SubscribeForm = () => {
  const [email, setEmail] = useState("");
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
        ...data, // ✅ manually add the date
      };
       router.push("/thank-you");
        const res = await addSubscribeEnquiryAPI(payload);
        if(res.status=="success"){
          setSuccessmsg(res.message)
          setEmail("")
        }
  
        setError({});
       
      // (Reset other fields here if needed)
    } catch (err) {
      setError({ general: err.message || "Something went wrong" });
    }
    };

  return (
    <form className="footer_mailchimp_form" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center">
        <div className="col-auto">
          {/* <input
            type="email"
            className="form-control mb-2"
            id="inlineFormInput"
            placeholder="Your email"
          /> */}
          <input
              id="form_email"
              className="form-control email mb-2"
              type="email"
              placeholder="Email"
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

        <div className="col-auto ms-2">
          <button type="submit" className="btn btn-primary mb-2">
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
