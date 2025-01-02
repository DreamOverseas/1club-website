import React, { useState, useEffect } from "react";
import "../Styles/Navigation.css";
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import LoginModal from './LoginModal';

const Navigation = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(''); // Track the selected nav item
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navLinks = [/*'Prize', 'Events',*/ 'About us', 'Contact us', 'Membership'];
  const navDisplays = {
    'Prize': '抽奖',
    'Events': '会员活动',
    'About us': '关于我们',
    'Contact us': '联系我们',
    'Membership': '会员'
  };

  const API_ENDPOINT = process.env.REACT_APP_CMS_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_CMS_API_KEY;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken'); // 检查登录状态
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Update active link based on the current pathname
    const currentPath = location.pathname.split('/')[1] || '';
    setActiveLink(currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, ' '));
  }, [location]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('user');
    setIsLoggedIn(false);
    window.location.reload(); // 刷新以更新 UI
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src='logo192.png'
            alt="Logo"
            className="me-2 nav-logo-1club"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          {/* Navigation Links are derived from Link name with lowercase and white spaces become hyphen */}
          <Nav className="me-4 d-flex align-items-center">
            {navLinks.map((item) => (
              <Nav.Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                eventKey={item}
                className={`navigation-link-item ${activeLink === item ? 'active-nav-item' : ''}`}
              >
                {navDisplays[item]}
              </Nav.Link>
            ))}
          </Nav>

          <div className="nav-delimiter"></div>

          {isLoggedIn ? (
            <Button variant="dark" className="fw-bold" href="/member-center">
              会员中心
            </Button>
          ) : (
            <Button
              variant="dark"
              className="fw-bold"
              onClick={() => setShowLoginModal(true)}
            >
              注册/登录
            </Button>
          )}
        </Navbar.Collapse>
        <LoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)} // 点击关闭按钮时隐藏 Modal
        />
      </Container>
    </Navbar>
  );
};

export default Navigation;

