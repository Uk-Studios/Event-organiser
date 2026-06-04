import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useState } from "react";

import api from "../services/api";

import { toast } from "react-toastify";

import "../styles/contactScreen.css";

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    location: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/enquiries", formData);

      toast.success("Enquiry Sent Successfully");

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        location: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={11}>
            <div className="contact-card">
              <div className="contact-intro-panel">
                <span>Private Event Enquiries</span>

                <h1>Reserve Your Celebration</h1>

                <p>
                  Share the details of your occasion and our team will shape a
                  refined proposal around your date, venue and vision.
                </p>
              </div>

              <Form onSubmit={submitHandler} className="contact-form-card">
                <div className="form-section-heading">
                  <span>Consultation Request</span>

                  <h2>Event Details</h2>
                </div>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Full Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Phone</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Event Type</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Event Type"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Location</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Budget</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Investment Range"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Event Vision</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Tell us about the atmosphere, guest count and key moments..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Form.Group>

                <p className="contact-form-note">
                  Your details are kept private and used only to prepare your
                  consultation.
                </p>

                <Button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Request Consultation"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactScreen;
