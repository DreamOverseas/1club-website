import React, { useState } from "react";
import axios from 'axios';
import "../Styles/Footer.css";
import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap';
import DoTermsAndConditions from "./DoTermsAndConditions";

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
            setMessage("已成功订阅!");
            setEmail('');
            setError('');
        } catch (error) {
            setError(`在订阅 ${email}时出了点问题... 请通过电邮联系我们。`);
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
                            <a href="/" className="footer-quick-links footer-texts">首页</a>
                            <a href="/membership" className="footer-quick-links footer-texts">会员</a>
                            {/* <a href="/events" className="footer-quick-links footer-texts">活动</a> */}
                            <a href="/about-us" className="footer-quick-links footer-texts">关于我们</a>
                            <a href="/contact-us" className="footer-quick-links footer-texts">联系我们</a>
                            <DoTermsAndConditions className="footer-quick-links footer-texts" defaultLang="zh" />
                        </span>
                    </Row>
                </Col>
                <Col sm={12} md={6} >
                    <Row>
                        {/* Text Section */}
                        <Col xs={12}>
                            <p className="footer-texts mb-2">
                                从 1# Club 获取最新资讯! <br />
                            </p>
                        </Col>

                        {/* Input and Button Section */}
                        <Col xs={12} className="d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formEmail" className="mb-0 me-2">
                                <Form.Control
                                    type="email"
                                    placeholder="请输入您的邮箱
                                    "
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
                                订阅
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
