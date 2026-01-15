import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";

const Events = () => {
  return (
    <Container className="page-body-360Club">
      <Helmet>
        <title>Events - 360Club</title>
        <meta
          name="description"
          content="Event page for 360Club, the private club for high-end customers."
        />
        <meta
          name="keywords"
          content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape"
        />
      </Helmet>

      <div className="sticky-navbar-page-start-placeholder" />

      {/* ===== Page Contents start here ===== */}
      <br />
      <br />
      <br />
      <br />
      <img src="favicon.ico" className="App-logo" alt="logo" />
      <p>Events Page Under Construction, pls wait...</p>
    </Container>
  );
};

export default Events;
