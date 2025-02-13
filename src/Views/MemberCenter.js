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
                        <Col sm={4} className="text-muted">积分 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
  <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></Col>
                        <Col sm={8}>{user.loyalty}</Col>
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
