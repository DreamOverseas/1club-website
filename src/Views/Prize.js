import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Prize.css";
import { Container } from 'react-bootstrap';

const Prize = () => {

    return (
        <Container className="page-body-1club">
            <Helmet>
                <title>1# Club Prizes</title>
                <meta name="description" content="Prize display of 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>


            <div className="sticky-navbar-page-start-placeholder" />

            {/* ===== Page Contents start here ===== */}
            <br /><br /><br /><br />
            <img src="favicon.ico" className="App-logo" alt="logo" />
            <p>
                Prize Page Under Construction, pls wait...
            </p>

        </Container>
    );
};

export default Prize;
