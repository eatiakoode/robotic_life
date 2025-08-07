'use client'

import { useState } from "react";
import AppointmentCalendar from "../common/AppointmentCalendar";
import { addEnquiryAPI } from "@/api/frontend/enquiry";
import { useRouter, useParams } from "next/navigation";
import { useForm } from 'react-hook-form';

const Form = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  
   
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      reset,
    } = useForm();
  
  // const addProperty = async (e) => {
  const onSubmit = async (data) => {
    
    try {
      
      const payload = {
      ...data,
      date:appointmentDate, // ✅ manually add the date
    };
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
  return (
    <form className="contact_form" action="#" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              // required="required"
              type="text"
              placeholder="Subject"
              // value={subject} onChange={(e) => setSubject(e.target.value)}
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && <span className="text-danger">{errors.subject.message}</span>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="form-group">
            <AppointmentCalendar onDateChange={setAppointmentDate} />
            {/* {error.appointmentDate && <span className="text-danger">{error.appointmentDate}</span>} */}
          </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
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
          </div>
          {/* End .col */}
          {successmsg && <span className="text-success">{successmsg}</span>}
          
          <div className="col-sm-12">
            <div className="form-group mb0">
             <button type="submit"  disabled={isSubmitting}  className="btn btn-lg btn-thm">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
              {/* <button type="submit" className="btn btn-lg btn-thm">
                Send Message
              </button> */}
            </div>
          {/* End button submit */}
        </div>
        </div>
      
    </form>
  );
};

export default Form;
