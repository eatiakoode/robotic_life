'use client';

import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { addLandingEnquiryAPI } from "@/api/frontend/landingenquiry";


const UnlockModal = ({ onClose, onUnlock, landingpage}) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
const router = useRouter();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you can do an API call if needed
  //   onUnlock(); // Unlock and close modal
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to backend here
      data.landingpageid=landingpage._id
      router.push("/thank-you");
      const res = await addLandingEnquiryAPI(data);
      onUnlock();
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Begin Your Dream Home Plan</h4>
        <form onSubmit={handleSubmit(onSubmit)} >
        {/* <input type="hidden" name="landingpageid" value={landingpage._id} {...register('landingpageid')} /> */}
          <input
            type="text"
            placeholder="Name"
            // required
            // value={formData.name}
            // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            {...register('name', { required: 'Name is required' })}
          />
          
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <input
            type="phone"
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
           {isSubmitSuccessful && (
              <p className="text-green-600 mt-2">Your message has been sent successfully!</p>
            )}
          <button type="submit"  disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
          <button type="button" onClick={onClose} className="cancel-btn"><span className="flaticon-close"></span></button>
        </form>
      </div>

      
    </div>
  );
};

export default UnlockModal;
