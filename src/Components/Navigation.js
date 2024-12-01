import React, {useState, useEffect} from "react";
import "../Styles/Navigation.css";
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
    const location = useLocation();
  const [activeLink, setActiveLink] = useState(''); // Track the selected nav item
  const navLinks = ['Prize', 'Events', 'About us', 'Membership', 'Contact us'];

  useEffect(() => {
    // Update active link based on the current pathname
    const currentPath = location.pathname.split('/')[1] || ''; 
    setActiveLink(currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, ' '));
  }, [location]);

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src='logo192.png'
            alt="Logo"
            className="me-2 nav-logo-1club"
          />
          <span className="nav-brand-text">1 Club</span>
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
                className= {`navigation-link-item ${activeLink === item ? 'active-nav-item' : ''}`}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>

          <div className="nav-delimiter"></div>

          <Button
            variant="dark"
            href="/membership"
            className="fw-bold"
          >
            <div className="nav-button-text">
             Log in
            </div>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

