'use client'

import { useState } from "react";

import { addPropertyEnquiryAPI } from "@/api/frontend/propertyenquiry";
import { useRouter, useParams } from "next/navigation";
import { useForm } from 'react-hook-form';

const ContactWithAgent = ({property}) => {
  // const [appointmentDate, setAppointmentDate] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("property")
    console.log(property)
    try {
      const payload = {
        name, email, phone, message, budget,
        propertyid:property._id,
        sellerid:property.sellerid?._id
        // date:appointmentDate
      };
      data.propertyid=property._id
      data.sellerid=property.sellerid?._id
     console.log(data)
       router.push("/thank-you");
      const res = await addPropertyEnquiryAPI(data);
      setSuccessmsg(res.message)
      if(res.success){
       
        setName("")
        setEmail("")
        setPhone("")
        // setSubject("")
        setMessage("")
      }

      setError({});
      
    // (Reset other fields here if needed)
  } catch (err) {
    setError({ general: err.message || "Something went wrong" });
  }
  };
  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
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
            {/* {error.name && <span className="text-danger">{error.name}</span>} */}
          </div>
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
         <input
              id="form_phone"
              className="form-control phone"
              type="text"
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
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
          <input
              id="form_email"
              name="form_email"
              className="form-control  email"
              // required="required"
              type="email"
              placeholder="Email"
              // value={email} 
              // onChange={(e) => setEmail(e.target.value)}
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
        </li>{" "}
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
            <select
              id="form_budget"
              name="form_budget"
              className="form-control"
              // value={budget}
              // onChange={(e) => setBudget(e.target.value)}
              {...register('budget', { required: 'Budget is required' })}
              >
              <option value="">Select Budget</option>
              <option value="Up to 2 Cr">Up to 2 Cr</option>
              <option value="2 - 5 Cr">2 - 5 Cr</option>
              <option value="5 - 10 Cr">5 - 10 Cr</option>
              <option value="above 10 Cr">Above 10 Cr</option>
            </select>            
            <span className="flaticon-download-1 fz12"></span>
            {errors.budget && <span className="text-danger">{errors.budget.message}</span>}
          </div>
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
          <textarea
                id="form_message"
                name="form_message"
                className="form-control required"
                rows="1"
                // required="required"
                placeholder="Your Message"
                // value={message} onChange={(e) => setMessage(e.target.value)}
                {...register('message', { required: 'Message is required' })}
              ></textarea>
              {errors.message && <span className="text-danger">{errors.message.message}</span>}
          </div>
        </li>{" "}
        {/* End li */}

        <li>
        {successmsg && <span className="text-success">{successmsg}</span>}
          <div className="search_option_button">
            <button type="submit"  disabled={isSubmitting}  className="btn btn-block btn-thm w-100">{isSubmitting ? 'Sending...' : 'Request'}</button>
          </div>
        </li>{" "}
        {/* End li */}
      </ul>
    </form>
  );
};

export default ContactWithAgent;
