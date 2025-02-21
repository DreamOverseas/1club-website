import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import QRCode from 'qrcode';
import CryptoJS from "crypto-js";

const MemberManagement = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [memberships, setMemberships] = useState([]);
    const [filteredMemberships, setFilteredMemberships] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // 从环境变量中读取配置（注意：create-react-app 下，所有 env 变量名必须以 REACT_APP_ 开头）
    const cmsApiEndpoint = process.env.REACT_APP_CMS_API_ENDPOINT;
    const cmsApiKey = process.env.REACT_APP_CMS_API_KEY;
    const adminPwd = process.env.REACT_APP_ADMIN_PWD;
    const commonSecret = process.env.REACT_APP_COMMON_SECRET;

    const handleLogin = (e) => {
        e.preventDefault();
        if (inputPassword === adminPwd) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('密码错误，请重试');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchMemberships = async () => {
            try {
                const response = await fetch(`${cmsApiEndpoint}/api/one-club-memberships`, {
                    headers: {
                        Authorization: `Bearer ${cmsApiKey}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('网络错误');
                }
                const data = await response.json();

                const membershipsData = data.data.map(item => ({
                    id: item.id,
                    name: item.Name,
                    membershipNumber: item.MembershipNumber
                }));
                setMemberships(membershipsData);
                setFilteredMemberships(membershipsData);
            } catch (error) {
                console.error('获取会员数据失败:', error);
            }
        };

        fetchMemberships();
    }, [isAuthenticated, cmsApiEndpoint, cmsApiKey]);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = memberships.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.membershipNumber.toLowerCase().includes(query)
        );
        setFilteredMemberships(filtered);
    }, [searchQuery, memberships]);

    const generateSignature = (name, membershipNumber) => {
        const message = `${name}${membershipNumber}${commonSecret}`;
        return CryptoJS.SHA256(message).toString();
    };

    const generateQRData = (name, membershipNumber) => {
        const signature = generateSignature(name, membershipNumber);
        return JSON.stringify({
            name,
            membershipNumber,
            data: signature
        });
    };

    const handleDownloadQR = async (name, serial) => {
        try {
            const currQRData = generateQRData(name, serial);
            console.log(`Name: ${name}, QR Data: ${currQRData}.`);
            const qrCodeDataURL = await QRCode.toDataURL(currQRData);
            const link = document.createElement('a');
            link.href = qrCodeDataURL;
            link.download = `${serial}-${name}.png`;
            link.click();
        } catch (error) {
            console.error('Error generating QR Code:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center vh-100">
                <Form onSubmit={handleLogin} className="p-4 border rounded" style={{ minWidth: '300px' }}>
                    <Form.Group controlId="password">
                        <Form.Label>请输入密码</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="密码"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </Form.Group>
                    {loginError && <div className="text-danger mt-2">{loginError}</div>}
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        登录
                    </Button>
                </Form>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="sticky-navbar-page-start-placeholder" />

            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search/搜索会员"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                {filteredMemberships.map(membership => (
                    <Col key={membership.id} xs={12} md={4} className="mb-3">
                        <Card key={membership.id} className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col xs={10}>
                                        <Card.Title>{membership.name}</Card.Title>
                                        <Card.Text>{membership.membershipNumber}</Card.Text>
                                    </Col>
                                    <Col xs={2} className="d-flex align-items-center justify-content-center">
                                        <Button variant="outline-secondary"
                                            onClick={() => handleDownloadQR(membership.name, membership.membershipNumber)}
                                        >
                                            <i className="bi bi-cloud-download text-2xl"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MemberManagement;
