import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/MemberCenter.css";
import { Button, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';

const MemberCenter = () => {

    const handleLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('user');
        window.location.reload();
      };

    return (
        <Container className="page-body-1club">
            <Helmet>
                <title>1# Club MemberCenter</title>
                <meta name="description" content="MemberCenter of 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>


            <div className="sticky-navbar-page-start-placeholder" />

            {/* ===== Page Contents start here ===== */}
            <br /><br /><br /><br />
            <img src="favicon.ico" className="App-logo" alt="logo" />
            <p>
                MemberCenter Page Under Construction, pls wait...
            </p>

            <Button vatiant="warning" onClick={handleLogout}>
                登出 / Log Out
            </Button>

        </Container>
    );
};

export default MemberCenter;
