import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../Styles/MemberCenter.css';

const MemberCenter = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('user');
        navigate('/');
        window.location.reload();
    };

    if (!user) {
        return null;
    }

    const membershipClassStyle = {
        Gold: 'gold-bg',
        Platinum: 'platinum-bg',
        Diamond: 'diamond-bg',
    };

    return (
        <Container className="my-5 member-center">
            <div className="sticky-navbar-page-start-placeholder" />
            <h1 className="text-center mb-4">会员中心</h1>
            <Card className="shadow">
                <Card.Body>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">名字</Col>
                        <Col sm={8}>{user.name}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">会员号</Col>
                        <Col sm={8}>{user.number}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">邮箱</Col>
                        <Col sm={8}>{user.email}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">会员等级</Col>
                        <Col sm={8}>
                            <span className={`membership-class ${membershipClassStyle[user.MembershipClass]}`}>
                                {user.class}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">到期日</Col>
                        <Col sm={8}>{user.exp}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">会员点数</Col>
                        <Col sm={8}>{user.points}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="text-muted">当前状态</Col>
                        <Col sm={8}>活跃</Col>
                    </Row>
                    <div className="text-center mt-4">
                        <Button variant="danger" onClick={handleLogout}>
                            登出
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MemberCenter;
