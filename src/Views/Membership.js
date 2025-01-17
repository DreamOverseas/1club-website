import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import "../Styles/Membership.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ApplicationFormModal from '../Components/ApplicationFormModal';
import MemberCard from '../Components/MemberCard';

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
            '享有维多利亚州海河交替的罗塞尼斯营地半岛度假村的使用权，可携亲友共享度假体验（人数不限）',
            '会员可根据相关法律将度假获得的自然馈赠（如新鲜海鲜或合法猎物）带回家',
            '参与中型高端社交活动，拓展人脉与资源'
        ]
    },
    {
        level: "Platinum",
        levelDisplay: '1# Club 铂金会员',
        price: '$18,888 AUD / 5年',
        hrefURL: "https://do360.com/products/platinum-club-membership",
        benefits: [
            '享有所有黄金会员权益',
            '专属进入 Willis Island Château La Marais 法式城堡，享受岛屿私密度假服务',
            '每年可享受合作方提供的一周全球度假体验，涵盖奢华岛屿、文化胜地等'
        ]
    },
    {
        level: "Diamond",
        levelDisplay: 'Club Le Marais 钻石会员',
        price: '$58,888 AUD / 5年',
        hrefURL: "https://do360.com/products/diamond-club-membership",
        benefits: [
            '享有所有黄金与铂金会员权益',
            '尊享 Willis Island 的所有专属资源，包括码头、果园、森林以及隐秘的法式城堡',
            '每年参与 NGO Hub 策划的顶级商/政界活动',
            '每年选美大赛的决赛VIP席位'
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

            <Row>
                <Col>
                    <div className="text-start membership-intro" >
                        <p>
                            会员资格通过<b>邀请</b>或<b>审核</b>授予，满足以下条件即可申请：<br />
                            - 年龄须满二十一岁，具备高净值人群背景或专业推荐 <br />
                            - 获得 1-2 名原会员俱乐部认可人的推荐，并通过俱乐部审核 <br />
                            - 支付相关费用（注意：费用一旦支付不可退还） <br />
                            - 活动携带的朋友或家属需经过俱乐部的批准
                        </p>
                        <p>
                            我们欢迎来自各行各业的会员及嘉宾，包括艺术、法律、医学、科学、媒体和商业等。
                        </p>
                        <p>
                            卓越的旅行体验和独家活动是我们俱乐部活动的核心。这些活动涵盖了美酒、汽车、诗歌、文学、时事、体育和艺术等。
                        </p>
                    </div>
                </Col>
                <Col>
                    <MemberCard className="membership-card-display" />
                </Col>
            </Row>

            <div className="text-center membership-intro">
                <p>
                    <h5>一号俱乐部会员规则</h5><br />
                    <b>1. 会员推荐制</b><br />
                    一号俱乐部为私人俱乐部，仅接受现有会员推荐入会，除非获得特别许可。<br />
                    会员需通过推荐人认证后，方可享受会员资格。<br />

                    <b>2. 会员信息保密</b><br />
                    发卡方将严格保护会员的个人信息，未经会员授权，不会将其信息泄露给第三方。<br />

                    <b>3. 规则变更权</b><br />
                    发卡方保留随时调整会员规则的权利。<br />
                    所有变更将通过官方网站发布(即本页面)，会员需及时关注以了解最新规则。<br />

                    <b>4. 会员行为规范</b><br />
                    会员需遵守俱乐部礼仪与行为规范。<br />
                    在任何活动中，禁止任何违反俱乐部价值观的行为。<br />
                    违反规则的会员可能会被取消资格，且已支付费用不予退还。<br />

                    <b>5. 资源与服务使用</b><br />
                    会员使用俱乐部的资源和服务需提前预约，以确保服务品质和公平性。<br />
                    具体预约规则详见官网。<br />

                    <b>6. 会员资格解释权</b><br />
                    会员资格的最终解释权归一号俱乐部所有。<br />
                    如有争议，以俱乐部最终决定为准。<br /><br /><br />

                    <h5>1Club Membership Rules</h5><br />
                    <b>1. Membership by Recommendation</b><br />
                    1Club is a private club. Membership is granted by recommendation from an existing member unless special permission is provided.<br />
                    New members must be approved through the referral process before accessing membership benefits.<br />

                    <b>2. Confidentiality of Member Information</b><br />
                    The issuer strictly protects members’ personal information.<br />
                    It will not be shared with third parties without the member’s explicit consent.<br />

                    <b>3. Right to Update Rules</b><br />
                    The issuer reserves the right to modify membership rules at any time.<br />
                    Updates will be published here, and members are encouraged to check for updates regularly.<br />

                    <b>4. Member Conduct Guidelines</b><br />
                    Members must follow club etiquette and behavior guidelines.<br />
                    Any actions contrary to the club’s values are prohibited.<br />
                    Violators may have their membership revoked, with no refund of any fees paid.<br />

                    <b>5. Use of Resources and Services</b><br />
                    All club resources and services must be booked in advance to ensure quality and fairness.<br />
                    Please refer to the website for detailed booking policies.<br />

                    <b>6. Interpretation of Membership Qualifications</b><br />
                    The final interpretation of membership qualifications rests with 1Club.<br />
                    In the event of any disputes, the club’s decision will be final.<br />
                </p>
            </div>

        </Container>
    );
};

export default Membership;
