import React from "react";
import "../Styles/Membership.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const memberships = [
    {
        level: 'Gold',
        price: '$5,888 / 5 Years',
        benefits: [
            'Access to Roseneath Holiday Park',
            'Could bring Friends at any amount',
            "Including Taking away the place's products (Conditions apply)"
        ]
    },
    {
        level: 'Platinum',
        price: '$18,888 / 5 Years',
        benefits: [
            'Access to Roseneath Holiday Park',
            'Could bring Friends at any amount',
            "Access to Chateau Le Marais, a Private French-styled Mansion",
            "Including Taking away the places' products (Conditions apply)",
            'One week of any holiday plan from Thirdhome (1 person/times)'
        ]
    },
    {
        level: 'Diamond',
        price: '$58,888 / 5 Years',
        benefits: [
            'Access to Roseneath Holiday Park',
            'Could bring Friends at any amount',
            "Access to Chateau Le Marais, a Private French-styled Mansion",
            "Including Taking away the places' products (Conditions apply)",
            'One week of any holiday plan from Thirdhome (2 person/times)',
            'Business/Political Events held by NGO Hub, including a VIP seat in annual beauty pageant'
        ]
    }
];


const Membership = () => {

    return (
        <Container className="page-body-1club">
            <div className="sticky-navbar-page-start-placeholder" />

            {/* ===== Page Contents start here ===== */}
            <div className="membership-level-div">
                <h1 className="text-center mb-4 membership-level-title">Membership Levels</h1>
                <Row>
                    {memberships.map((membership, index) => (
                        <Col md={4} className="mb-4" key={index}>
                            <Card className="h-100 text-center shadow-sm membership-card">
                                <Card.Body>
                                    <Card.Title className={`membership-title ${membership.level.toLowerCase()}`}>
                                        {membership.level}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">{membership.price}</Card.Subtitle>
                                    <ul className="membership-benefits list-unstyled">
                                        {membership.benefits.map((benefit, idx) => (
                                            <li key={idx} className="mb-2">
                                                &#10003; {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="text-center membership-intro">
                <p>
                    Membership is granted through <b>invitation</b> or <b>review</b>. Members are welcomed from diverse backgrounds, including art, law, medicine, science, media, and business.
                </p>
                <p>
                    Exceptional travel experiences and exclusive events form the heart of our club's activities. These encompass fine wine, automobiles, poetry, literature, current affairs, sports, and the arts.
                </p>
                <p>
                    This extraordinary club offers unique experiences for our members and their guests.
                </p>
            </div>
        </Container>
    );
};

export default Membership;
