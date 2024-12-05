import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import "../Styles/Membership.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ApplicationFormModal from '../Components/ApplicationFormModal';

const basicBenefits = [
    '在各奢侈品零售商处享受独家优惠、折扣和配套礼品包',
    '使用我们的豪华房屋交换服务，您可以在您的第二居所接待其他会员，还可以使用全球各种度假房屋',
    '加入1# Club社交网络，寻找志同道合的人,建立联系、开展合作、分享见解，促进联系',
    '私人餐厅服务：可安排厨师和食物等（提前与房东安排，有额外费用）',
    '品尝到世界知名葡萄酒品牌带来的非凡葡萄酒体验',
    '可以在私董会举办各种活动，如公司活动、婚礼、董事会议等'
];

const memberships = [
    {
        level: "Gold",
        levelDisplay: '1# Club 黄金会员',
        price: '$5,888 AUD / 5年',
        hrefURL: "https://do360.com/products/gold-club-membership",
        benefits: [
            '进入Roseneath度假公园',
            '可携带不限人数的朋友',
            '包括带走园区特色产品（需符合条件）'
        ]
    },
    {
        level: "Platinum",
        levelDisplay: '1# Club 铂金会员',
        price: '$18,888 AUD / 5年',
        hrefURL: "https://do360.com/products/platinum-club-membership",
        benefits: [
            '享有所有黄金会员权益',
            '进入Chateau Le Marais，法式风格的私人豪宅庄园',
            '包括带走包括Chateau Le Marais在内的地方特色产品（需符合条件）',
            '可享受Thirdhome的任何度假计划一周（1次）'
        ]
    },
    {
        level: "Diamond",
        levelDisplay: 'Club Le Marais 钻石会员',
        price: '$58,888 AUD / 5年',
        hrefURL: "https://do360.com/products/diamond-club-membership",
        benefits: [
            '享有所有铂金会员权益',
            '可额外享受Thirdhome的任何度假计划一周（合2次）',
            '参加NGO Hub举办的商/政界活动',
            '每年选美大赛的VIP席位'
        ]
    }
];

const Membership = () => {
    const [isModalActive, setIsModalActive] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(null);

    const handleShowModal = (membershipLevel) => {
        setSelectedMembership(membershipLevel);
        setIsModalActive(true);
    };

    const handleCloseModal = () => {
        setIsModalActive(false);
        setSelectedMembership(null);
    };

    return (
        <Container className="page-body-1club">
            <Helmet>
                <title>1# Club Membership</title>
                <meta name="description" content="Membership page for 1# Club." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>

            <div className="sticky-navbar-page-start-placeholder" />

            <div className="membership-level-div">
                <h1 className="text-center mb-4 membership-level-title">会员等级 - Membership Levels</h1>
                <div className="membership-promote">首批会员招募，从速限时</div>
                <Row>
                    {memberships.map((membership, index) => (
                        <Col md={4} className="mb-4" key={index}>
                            <Card className='h-100 text-center shadow-sm membership-card'>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className={`membership-title text-with-shadow ${membership.level.toLowerCase()}`}>
                                        {membership.levelDisplay}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">{membership.price}</Card.Subtitle>
                                    <ul className="membership-benefits list-unstyled">
                                        <b>会员基础权益</b>
                                        {basicBenefits.map((benefit, idx) => (
                                            <li key={idx} className="mb-2">
                                                &#10003; {benefit}
                                            </li>
                                        ))}
                                        <b>额外权益</b>
                                        {membership.benefits.map((benefit, idx) => (
                                            <li key={idx} className="mb-2">
                                                ☆ {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto">
                                        <Button
                                            variant='dark'
                                            onClick={() => handleShowModal(membership.level)}
                                            className={`mt-3 membership-button-${membership.level.toLowerCase()}`}
                                        >
                                            申请 {membership.levelDisplay}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ApplicationFormModal
                active={isModalActive}
                membershipClass={selectedMembership}
                onClose={handleCloseModal}
            />

            <div className="text-center membership-intro">
                <p>
                    会员资格通过<b>邀请</b>或<b>审核</b>授予，满足以下条件即可申请：<br />
                    - 属于精英群体 -<br />
                    - 获得 1-2 名原会员俱乐部认可人的推荐 -<br />
                    - 支付相关费用（注意：费用一旦支付不可退还） -<br />
                    - 活动携带的朋友或家属需经过俱乐部的批准 -
                </p>
                <p>
                    我们欢迎来自各行各业的会员及嘉宾，包括艺术、法律、医学、科学、媒体和商业等。
                </p><p>
                    卓越的旅行体验和独家活动是我们俱乐部活动的核心。这些活动涵盖了美酒、汽车、诗歌、文学、时事、体育和艺术等。
                </p>
            </div>
        </Container>
    );
};

export default Membership;
