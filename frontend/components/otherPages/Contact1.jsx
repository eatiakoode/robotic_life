"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function Contact1() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const sendEnquiry = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(formRef.current);
    const enquiryData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // Try multiple backend URLs for robustness
      const backendUrls = [
        'http://localhost:5000',
        'http://localhost:3001',
        'http://localhost:8000',
        process.env.NEXT_PUBLIC_API_URL
      ].filter(Boolean);

      let response = null;
      let lastError = null;

      for (const backendUrl of backendUrls) {
        try {
          const apiUrl = `${backendUrl}/frontend/api/enquiry`;
          response = await axios.post(apiUrl, enquiryData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.status === 201) {
            break;
          }
        } catch (err) {
          console.log('Failed to send enquiry to', backendUrl, ':', err.message);
          lastError = err;
          continue;
        }
      }

      if (!response || response.status !== 201) {
        throw new Error(lastError?.response?.data?.message || 'Failed to send enquiry');
      }

      setSuccess(true);
      handleShowMessage();
      formRef.current.reset();
    } catch (error) {
      console.error("Error sending enquiry:", error);
      setSuccess(false);
      handleShowMessage();
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Get In Touch</h3>
          <p className="subheading">
            Use the form below to get in touch with the sales team
          </p>
        </div>
        <div
          className={`tfSubscribeMsg  footer-sub-element ${
            showMessage ? "active" : ""
          }`}
        >
          {success ? (
            <p style={{ color: "rgb(52, 168, 83)" }}>
              Message Sent Successfully
            </p>
          ) : (
            <p style={{ color: "red" }}>Something went wrong</p>
          )}
        </div>
        <form onSubmit={sendEnquiry} ref={formRef} className="form-leave-comment">
          <div className="wrap">
            <div className="cols">
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Your Name*"
                  name="name"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="email"
                  placeholder="Your Email*"
                  name="email"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
            </div>
            <fieldset className="">
              <textarea
                className=""
                rows={4}
                placeholder="Your Message*"
                name="message"
                tabIndex={2}
                aria-required="true"
                required
                defaultValue={""}
              />
            </fieldset>
          </div>
          <div className="button-submit text-center">
            <button 
              className="tf-btn btn-fill" 
              type="submit"
              disabled={loading}
            >
              <span className="text text-button">
                {loading ? "Sending..." : "Send message"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
