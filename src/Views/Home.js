import React from "react";
import "../Styles/Home.css";
import { Container } from 'react-bootstrap';

const Home = () => {

    return (
        <>
            <div className="landing-title-section">
                <div className="home-title-container">
                    <h1 className="home-title">Welcome to 1# Club</h1>
                    <h4 className="home-subtitle">The private club for overseas-student's parents</h4>
                </div>

                <div className="home-scroll-indicator">
                    <p>Scrolling down for more info</p>
                </div>
            </div>

            <Container>
            </Container>
        </>
    );
};

export default Home;
