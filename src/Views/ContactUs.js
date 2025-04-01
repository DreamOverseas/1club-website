import React, { useState } from 'react';
import { Helmet } from "react-helmet";
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
                setResponseMessage('已成功提交，感谢您的耐心！');
                setIsSubmitting(false);
                setErrorMessage(null);
                setFormData({ name: '', phoneNumber: '', email: '', subject: '', question: '' });
            } else {
                setErrorMessage('哎呀，出问题了..请稍后再试或者通过电邮联系我们！');
                setIsSubmitting(false);
                setResponseMessage(null);
            }
        } catch (error) {
            setIsSubmitting(false);
            setErrorMessage('哎呀，出问题了..请稍后再试或者通过电邮联系我们！');
            setResponseMessage(null);
            console.error('Error:', error);
        }
    };

    return (
        <Container className="page-body-1club">
            <Helmet>
                <title>Contact - 1# Club</title>
                <meta name="description" content="Contact Us - 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>


            <div className="sticky-navbar-page-start-placeholder" />
            <br></br>
            <h2>恭候您的联系，请填写下表，我们将尽快给予您答复！</h2>
            <Row>
                <Col md={8}>
                    <Container className="my-5" style={{ maxWidth: '1000px' }}>
                        {/* Display success or error message */}
                        {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>姓名*</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="phoneNumber" className="mb-3">
                                <Form.Label>电话</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>电子邮箱*</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="subject" className="mb-3">
                                <Form.Label>咨询方向*</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="question" className="mb-3">
                                <Form.Label>咨询问题*</Form.Label>
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
                                    "提交"
                                )}
                            </Button>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <br /><br />
                    <Row>
                        <p>
                            <b>墨尔本办公室</b> &#128188;
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <i class="bi bi-pin-angle"></i> &nbsp;
                            Level 2, 171 La Trobe Street <br />Melbourne VIC 3000<br />Opening Mon-Fri 9:30-17:30
                        </p>
                    </Row>
                    <Row>
                        <p>
                            <i class="bi bi-telephone-inbound"></i> &nbsp;
                            +61 (0)413 168 533
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
