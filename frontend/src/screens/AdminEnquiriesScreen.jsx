import { useEffect, useState } from "react";

import {
  Button,
  Form,
  Modal,
} from "react-bootstrap";

import { toast } from "react-toastify";

import api from "../services/api";

import "../styles/AdminEnquiries.css";

const AdminEnquiriesScreen = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const fetchEnquiries = async () => {
    try {
      const { data } = await api.get("/enquiries", {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });

      setEnquiries(data);
    } catch (error) {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete enquiry?")) {
      return;
    }

    try {
      await api.delete(`/enquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });

      toast.success("Enquiry deleted");
      fetchEnquiries();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const statusHandler = async (enquiry, status) => {
    try {
      await api.put(
        `/enquiries/${enquiry._id}`,
        {
          ...enquiry,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        },
      );

      toast.success("Status updated");
      fetchEnquiries();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const getInitials = (name = "") => (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "ME"
  );

  if (loading) {
    return <div className="admin-loading">Loading enquiries...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header admin-page-header-row">
        <div>
          <span>Client Requests</span>
          <h1>Enquiries</h1>
          <p>Review incoming event requests and keep each lead moving through the pipeline.</p>
        </div>

        <div className="admin-count-pill">
          {enquiries.length} Total
        </div>
      </div>

      <div className="row g-4">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="col-12 col-sm-6 col-xl-4"
          >
            <div className="enquiry-card">
              <div className={`enquiry-status-line ${enquiry.status || "new"}`}></div>

              <div className="enquiry-top">
                <div className="enquiry-person">
                  <div className="enquiry-avatar">
                    {getInitials(enquiry.name)}
                  </div>

                  <div>
                    <h4>{enquiry.name}</h4>
                    <p>{enquiry.eventType || "Event enquiry"}</p>
                  </div>
                </div>

                <span className={`status-badge ${enquiry.status || "new"}`}>
                  {enquiry.status || "new"}
                </span>
              </div>

              <div className="enquiry-message-preview">
                {enquiry.message || "No message provided yet."}
              </div>

              <div className="enquiry-info">
                <div>
                  <span>Location</span>
                  <strong>{enquiry.location || "Not provided"}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{enquiry.phone}</strong>
                </div>

                <div>
                  <span>Budget</span>
                  <strong>{enquiry.budget || "Not provided"}</strong>
                </div>
              </div>

              <div className="enquiry-actions">
                <Button
                  className="admin-soft-btn"
                  size="sm"
                  onClick={() => openModal(enquiry)}
                >
                  View Details
                </Button>

                <Form.Select
                  size="sm"
                  value={enquiry.status || "new"}
                  onChange={(event) => statusHandler(enquiry, event.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </Form.Select>

                <Button
                  className="admin-danger-btn"
                  size="sm"
                  onClick={() => deleteHandler(enquiry._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="admin-modal"
      >
        <Modal.Header closeButton className="enquiry-modal-header">
          <div>
            <span>Client Request</span>
            <Modal.Title>Enquiry Details</Modal.Title>
            <p>Review the client brief and contact information.</p>
          </div>
        </Modal.Header>

        <Modal.Body>
          {selectedEnquiry && (
            <div className="enquiry-detail">
              <div className="enquiry-detail-profile">
                <div className="enquiry-avatar large">
                  {getInitials(selectedEnquiry.name)}
                </div>

                <div>
                  <h3>{selectedEnquiry.name}</h3>
                  <span className={`status-badge ${selectedEnquiry.status || "new"}`}>
                    {selectedEnquiry.status || "new"}
                  </span>
                </div>
              </div>

              <div className="enquiry-detail-message">
                <span>Message</span>
                <p>{selectedEnquiry.message || "No message provided."}</p>
              </div>

              <div className="detail-list">
                <span>Email</span>
                <strong>{selectedEnquiry.email || "Not provided"}</strong>

                <span>Phone</span>
                <strong>{selectedEnquiry.phone}</strong>

                <span>Event Type</span>
                <strong>{selectedEnquiry.eventType || "Not provided"}</strong>

                <span>Location</span>
                <strong>{selectedEnquiry.location || "Not provided"}</strong>

                <span>Budget</span>
                <strong>{selectedEnquiry.budget || "Not provided"}</strong>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminEnquiriesScreen;
