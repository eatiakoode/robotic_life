"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RobotFaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    robotid: ""
  });
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    fetchRobots();
    fetchFAQs();
  }, []);

  const fetchRobots = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}admin/api/robot`);
      const data = await response.json();
      setRobots(data);
    } catch (error) {
      console.error("Error fetching robots:", error);
    }
  };

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}admin/api/faq`);
      const data = await response.json();
      
      // Handle different response structures
      if (data.success && Array.isArray(data.data)) {
        setFaqs(data.data);
      } else if (Array.isArray(data)) {
        setFaqs(data);
      } else {
        setFaqs([]);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.robotid) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const url = editingFaq 
        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}admin/api/faq/${editingFaq._id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}admin/api/faq`;
      
      const method = editingFaq ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingFaq ? "FAQ updated successfully" : "FAQ created successfully");
        setFormData({ title: "", description: "", robotid: "" });
        setEditingFaq(null);
        fetchFAQs();
      } else {
        toast.error(data.error || "Failed to save FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error("Failed to save FAQ");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      title: faq.title,
      description: faq.description,
      robotid: faq.robotid
    });
  };

  const handleDelete = async (faqId) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}admin/api/faq/${faqId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("FAQ deleted successfully");
        fetchFAQs();
      } else {
        toast.error(data.error || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    } finally {
      setLoading(false);
    }
  };

  const getRobotName = (robotId) => {
    const robot = robots.find(r => r._id === robotId);
    return robot ? robot.title : "Unknown Robot";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            <h3 className="mb-4">Robot FAQ Management</h3>
            
            {/* FAQ Form */}
            <div className="card mb-4">
              <div className="card-header">
                <h5>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="robotid">Select Robot *</label>
                        <select
                          id="robotid"
                          className="form-control"
                          value={formData.robotid}
                          onChange={(e) => setFormData({ ...formData, robotid: e.target.value })}
                          required
                        >
                          <option value="">Select a robot</option>
                          {robots.map((robot) => (
                            <option key={robot._id} value={robot._id}>
                              {robot.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="title">Question *</label>
                        <input
                          type="text"
                          id="title"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter the question"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Answer *</label>
                    <textarea
                      id="description"
                      className="form-control"
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter the answer"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : editingFaq ? "Update FAQ" : "Add FAQ"}
                    </button>
                    {editingFaq && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingFaq(null);
                          setFormData({ title: "", description: "", robotid: "" });
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ List */}
            <div className="card">
              <div className="card-header">
                <h5>Existing FAQs</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : faqs.length === 0 ? (
                  <p className="text-muted">No FAQs found. Add some FAQs to get started.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Robot</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq) => (
                          <tr key={faq._id}>
                            <td>{getRobotName(faq.robotid)}</td>
                            <td>{faq.title}</td>
                            <td>
                              <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {faq.description}
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => handleEdit(faq)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(faq._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotFaqManagement;
