import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import "../Styles/ContactUs.css";

const ContactUs = () => {
    const mail_API_endpoint = `${process.env.REACT_APP_EMAIL_API_ENPOINT}1club/enquiry`;

    // State to hold form values
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        subject: '',
        question: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Handle form input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(mail_API_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: formData.name,
                    PhoneNumber: formData.phoneNumber,
                    Email: formData.email,
                    Subject: formData.subject,
                    Question: formData.question,
                }),
            });

            if (response.ok) {
                setResponseMessage('Your enquiry has been submitted successfully!');
                setIsSubmitting(false);
                setErrorMessage(null);
                setFormData({ name: '', phoneNumber: '', email: '', subject: '', question: '' });
            } else {
                setErrorMessage('There was a problem submitting your enquiry. Please try again later.');
                setIsSubmitting(false);
                setResponseMessage(null);
            }
        } catch (error) {
            setIsSubmitting(false);
            setErrorMessage('An error occurred. Please try again later.');
            setResponseMessage(null);
            console.error('Error:', error);
        }
    };

    return (
        <Container className="page-body-1club">
            <div className="sticky-navbar-page-start-placeholder" />
            <br></br>
            <h2>Submit your enquiry here. We'll reach back to you shortly.</h2>
            <Row>
                <Col md={8}>
                    <Container className="my-5" style={{ maxWidth: '1000px' }}>
                        {/* Display success or error message */}
                        {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="phoneNumber" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="subject" className="mb-3">
                                <Form.Label>Subject *</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="question" className="mb-3">
                                <Form.Label>Question *</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={formData.question}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" className='contact-submit-button'>
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <br/><br/>
                    <Row>
                        <p>
                            <b>Melbourne Office</b> &#128188;
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <i class="bi bi-pin-angle"></i> &nbsp;
                            Level 2, 171 La Trobe Street, Melbourne VIC 3000
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <i class="bi bi-telephone-inbound"></i> &nbsp;
                            +61 (04)13 168 533
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <i class="bi bi-mailbox"></i> &nbsp;
                            john.du@do360.com
                        </p>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
