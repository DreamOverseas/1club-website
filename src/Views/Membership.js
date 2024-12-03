import React from "react";
import "../Styles/Membership.css";
import { Container, Row, Col, Card } from 'react-bootstrap';

const memberships = [
    {
        level: 'Gold',
        levelDisplay: '黄金会员',
        price: '$5,888 AUD / 5年',
        benefits: [
            '进入Roseneath度假公园',
            '可携带不限人数的朋友',
            '包括带走园区特产（需符合条件）'
        ]
    },
    {
        level: 'Platinum',
        levelDisplay: '铂金会员',
        price: '$18,888 AUD / 5年',
        benefits: [
            '进入Roseneath度假公园',
            '可携带不限人数的朋友',
            '进入Chateau Le Marais，法式风格的私人豪宅庄园',
            '包括带走园区特产（需符合条件）',
            '可享受Thirdhome的任何度假计划一周（1人/次）'
        ]
    },
    {
        level: 'Diamond',
        levelDisplay: '钻石会员',
        price: '$58,888 AUD / 5年',
        benefits: [
            '进入Roseneath度假公园',
            '可携带不限人数的朋友',
            '进入Chateau Le Marais，法式风格的私人豪宅庄园',
            '包括带走园区特产（需符合条件）',
            '可享受Thirdhome的任何度假计划一周（2人/次）',
            '参加NGO Hub举办的商/政界活动，包括每年选美大赛的VIP席位'
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
                                        {membership.levelDisplay}
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
                    会员资格通过<b>邀请</b>或<b>审核</b>授予。会员来自各行各业，包括艺术、法律、医学、科学、媒体和商业。
                </p>
                <p>
                    卓越的旅行体验和独家活动是我们俱乐部活动的核心。这些活动涵盖了美酒、汽车、诗歌、文学、时事、体育和艺术。
                </p>
                <p>
                    这个非凡的俱乐部为我们的会员及其嘉宾提供了独特的体验。
                </p>
            </div>
        </Container>
    );
};

export default Membership;
