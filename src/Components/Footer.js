import React, { useState } from "react";
import axios from 'axios';
import "../Styles/Footer.css";
import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    /**
     * Function that handles submission on email to the subscription list of mailchimp
     */
    const subscribMe = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://mail-service.do360.com/subscribe/quick-subscription/', {
                // Using the 360media one for now since they are the same in function
                "email": email,
                "source": "1 Club"
            });
            setMessage("Successfully subscribed!");
            setEmail('');
            setError('');
        } catch (error) {
            setError(`There's some problem subscribing ${email}. Please contact us for help.`);
            setMessage('');
        }
    };

    return (
        <>
        <div className="footer-delimiter" />
        <Container className="footer-overall">
            <Row>
                <Col sm={12} md={6} className="mb-4 mb-md-0">
                    <Row>
                        <Image src="logo512.png" className="footer-logo" />
                    </Row>
                    <Row className="justify-content-start">
                        <span className="footer-links-row">
                            <a href="/membership" className="footer-quick-links footer-texts">Membership</a>
                            <a href="/events" className="footer-quick-links footer-texts">Events</a>
                            <a href="/about-us" className="footer-quick-links footer-texts">About us</a>
                            <a href="/contact-us" className="footer-quick-links footer-texts">Contact us</a>
                        </span>
                    </Row>
                </Col>
                <Col sm={12} md={6} >
                    <Row>
                        {/* Text Section */}
                        <Col xs={12}>
                            <p className="footer-texts mb-2">
                                Get the Latest Updates from 1# Club! <br />
                            </p>
                        </Col>

                        {/* Input and Button Section */}
                        <Col xs={12} className="d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formEmail" className="mb-0 me-2">
                                <Form.Control
                                    type="email"
                                    placeholder="Type your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-start"
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                type="submit"
                                onClick={subscribMe}
                                className="rounded-end subscribe-button"
                            >
                                Subscribe
                            </Button>
                        </Col>

                        {/* Alerts Section */}
                        <Col xs={12}>
                            {message && <Alert variant="success" className="mt-2 footer-notification">{message}</Alert>}
                            {error && <Alert variant="danger" className="mt-2 footer-notification">{error}</Alert>}
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Footer;
