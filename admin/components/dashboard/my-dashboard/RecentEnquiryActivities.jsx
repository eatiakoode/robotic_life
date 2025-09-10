"use client";

import { useState, useEffect } from "react";
import { getEnquiryTableData } from "@/api/enquiry";

const RecentEnquiryActivities = () => {
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEnquiries = async () => {
      try {
        const filter = { limit: 5, page: 1 }; // Get only 5 most recent enquiries
        const data = await getEnquiryTableData(filter);
        setRecentEnquiries(data.items || []);
      } catch (error) {
        console.error("Error fetching recent enquiries:", error);
        setRecentEnquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 mb-0 text-muted">Loading recent activities...</p>
      </div>
    );
  }

  if (recentEnquiries.length === 0) {
    return (
      <div className="text-center py-4">
        <div className="icon mb-3">
          <span className="flaticon-chat" style={{ fontSize: '24px', color: '#ccc' }}></span>
        </div>
        <p className="text-muted mb-0">No recent enquiries</p>
      </div>
    );
  }

  return (
    <>
      {recentEnquiries.map((enquiry, index) => (
        <div key={enquiry._id} className={`grid ${index === recentEnquiries.length - 1 ? 'mb0' : ''}`}>
          <ul className={index === recentEnquiries.length - 1 ? 'pb0 mb0 bb_none' : ''}>
            <li className="list-inline-item">
              <div className="icon">
                <span className="flaticon-chat"></span>
              </div>
            </li>

            <li className="list-inline-item">
              <p>
                <strong>{enquiry.name}</strong> submitted a new enquiry:{" "}
                <span style={{ 
                  display: 'block', 
                  marginTop: '4px', 
                  fontSize: '12px', 
                  color: '#666',
                  fontStyle: 'italic',
                  lineHeight: '1.4'
                }}>
                  "{enquiry.message}"
                </span>
                <small style={{ 
                  display: 'block', 
                  marginTop: '4px', 
                  color: '#999',
                  fontSize: '11px'
                }}>
                  {new Date(enquiry.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </small>
              </p>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default RecentEnquiryActivities;