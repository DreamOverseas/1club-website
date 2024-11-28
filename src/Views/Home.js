import React from "react";
import { useMediaQuery } from "react-responsive";
import "../Styles/Home.css";
import { Container, Row, Col, Image } from 'react-bootstrap';

const Home = () => {
    const onDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    const collabs = ["Chateau", "Thirdhome", "Airpay", "36OMedia", "NGOhub", "MI", "DO"];

    return (
        <>
            <div className="landing-title-section">
                <div className="home-title-container">
                    <h1 className="home-title">WELCOME  TO  1# CLUB</h1>
                    <h4 className="home-subtitle">Where Exclusivity Meets Excellence.</h4>
                </div>

                <div className="home-scroll-indicator">
                    <p>Scrolling down for more info</p>
                </div>
            </div>

            <Container> {/* Boardered contents starting here */}

                <Row className="home-section">
                    <Col md={4} className="d-flex home-icon-container">
                        <Image src="/Icons/Travel.png" className="home-section-icon" />
                    </Col>
                    <Col md={8} className="home-section-text">
                        <h1>World for Your Exploration</h1>
                        <p>Select finest destinations across 90+ countries with our exclusive travel services, powered by the prestigious Thirdhome network. From opulent villas to breathtaking retreats, we provide you unparalleled journeys tailored to your desires. Immerse yourself in a world where luxury meets adventure, and every getaway is an extraordinary experience.</p>
                    </Col>
                </Row>
                <Row className="home-section">
                    {onDesktop ? <></> :
                        <Col md={4} className="d-flex home-icon-container">
                            <Image src="/Icons/Accomadation.png" className="home-section-icon" />
                        </Col>
                    }
                    <Col md={8} className="home-section-text-rev">
                        <h1>Discover Luxury Living Beyond Compare</h1>
                        <p>Immerse yourself in the art of refined living with our exclusive accommodation services. From elegant French villas on private islands to serene vacation parks, charming farm stays, and picturesque vineyards , our offerings are crafted for those seeking extraordinary experiences. Indulge in curated activities, savor fresh island seafood and fruits, and bring home unique keepsakes to treasure your journey. Every stay is a celebration of luxury and the beauty of our club's exquisite real estate portfolio.</p>
                    </Col>
                    {onDesktop ?
                        <Col md={4} className="d-flex home-icon-container">
                            <Image src="/Icons/Accomadation.png" className="home-section-icon" />
                        </Col>
                        : <></>
                    }
                </Row>
                <Row className="home-section">
                    <Col md={4} className="d-flex home-icon-container">
                        <Image src="/Icons/Membership.png" className="home-section-icon" />
                    </Col>
                    <Col md={8} className="home-section-text">
                        <h1>Circle for the Elites</h1>
                        <p>Experience a world of unparalleled privileges with our exclusive membership. From luxurious vacations and premium accommodations to prestigious beauty pageants and high-level business and social events, our club offers a gateway to extraordinary opportunities. Membership is by invitation or through a rigorous approval process, ensuring a community of like-minded individuals who value excellence and exclusivity.</p>
                    </Col>
                </Row>

                <Row className="home-section justify-content-between">
                    <h1>Honorable Collaborators</h1> <br />
                    {collabs.map((collab) => (
                        <a className="home-collab-icon-container" href="/">
                            <Image className="home-collab-icons" src={`/collab/${collab}.png`} alt={`${collab}`} />
                        </a>
                    ))}
                </Row>
                <br />

            </Container>
        </>
    );
};

export default Home;
