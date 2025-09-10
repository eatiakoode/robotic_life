"use client";
import React, { useState, useEffect } from "react";

export default function FAQs({ product }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      // Check for both product.id and product._id to handle different data structures
      const productId = product?.id || product?._id;
      
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Ensure the base URL is always present, with a fallback to common backend ports
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/';
        const apiUrl = `${baseUrl}frontend/api/faq/robot/${productId}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the response data structure
        if (data.success && Array.isArray(data.data)) {
          setFaqs(data.data);
        } else if (Array.isArray(data)) {
          setFaqs(data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err.message);
        setFaqs([]); // Don't show default FAQs, show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [product?.id, product?._id]);



  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className="tab-faqs">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading FAQs...</span>
          </div>
          <p className="mt-3 text-muted">Loading frequently asked questions...</p>
        </div>
      </div>
    );
  }

  if (error && faqs.length === 0) {
    return (
      <div className="tab-faqs">
        <div className="text-center py-5">
          <div className="mb-3">
            <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="text-muted">Unable to Load FAQs</h5>
          <p className="text-muted">There was an error loading the frequently asked questions.</p>
          <button 
            className="btn btn-outline-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-faqs">
      <div className="faq-section">
        <h4 className="mb-4">Frequently Asked Questions</h4>
        <p className="text-muted mb-4">
          Find answers to common questions about this robot. If you don't see your question here, feel free to contact us.
        </p>
        
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="accordion-item border-0 mb-3">
              <div 
                className="accordion-header"
                style={{ 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}
              >
                <button
                  className={`accordion-button ${expandedFaq === faq._id ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleFaq(faq._id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    fontWeight: '500',
                    color: '#333',
                    boxShadow: 'none',
                    fontSize: '1rem'
                  }}
                >
                  <span className="me-3">
                    <i className={`fas fa-chevron-${expandedFaq === faq._id ? 'up' : 'down'} text-primary`}></i>
                  </span>
                  {faq.question}
                </button>
              </div>
              
              {expandedFaq === faq._id && (
                <div 
                  className="accordion-collapse show"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e9ecef',
                    borderTop: 'none',
                    borderRadius: '0 0 8px 8px',
                    marginTop: '-1px'
                  }}
                >
                  <div 
                    className="accordion-body"
                    style={{
                      padding: '1rem 1.25rem',
                      color: '#666',
                      lineHeight: '1.6'
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

                 {faqs.length === 0 && !loading && (
           <div className="text-center py-5">
             <div className="mb-3">
               <i className="fas fa-question-circle text-muted" style={{ fontSize: '3rem' }}></i>
             </div>
             <h5 className="text-muted">No FAQs Available</h5>
             <p className="text-muted">
               There are no frequently asked questions available for this robot yet. Check back later or contact us for more information.
             </p>
           </div>
         )}
      </div>
    </div>
  );
}
