import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/AboutUs.css";
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs = () => {

    return (
        <Container className="page-body-1club">
            <Helmet>
                <title>About Us - 1# Club</title>
                <meta name="description" content="About 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>

            {/* ===== Page Contents start here ===== */}
            <Row className="mb-5">
                <Col>
                    <br />
                    <h1 className="text-center mb-4">1号俱乐部 - 1# Club</h1>
                    <p className="about-us-intro">
                        <strong>构建全球精英社交平台</strong>
                        <div className="text-align-left">
                            <br />
                            • 1号俱乐部成立于澳大利亚，这片多元文化的土地，是通向世界的桥梁。在这里，您无需远行，即可结识来自中国及全球各地的精英人群 •
                            <br />
                            • 作为一个专注于高进值人群的高端俱乐部，1号俱乐部携手 世界合作组织-WCO 资源，联通澳洲与海外会员网络，打造一个汇聚商业、文化与政治资源的国际化社交平台 •
                            <br />
                            • 专属会员制, 为您提供量身定制的高质量体验 •
                        </div>
                    </p>
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col md={6} className="mb-4">
                    <Image src="/aboutus/clublemarais.png" alt="Club Le Marais" fluid rounded />
                </Col>
                <Col md={6}>
                    <h2 className="mb-3">Club Le Marais 私董会介绍</h2>
                    <p className="about-us-text-clublemarais">
                        私董会为 1 号俱乐部注入更多专属权益与奢华服务，精心打造超越期待的尊崇体验。1 号俱乐部秉承高端品位与卓越品质，其顶级品牌服务仅对达到特定等级的尊贵会员开放，彰显独一无二的身份象征。会员不仅可专享涵盖全球顶级资源的礼遇，还能邀请亲友一同融入俱乐部的非凡氛围，感受无与伦比的优雅与专属关怀。从私密聚会到奢华盛典，每一细节都力臻完美，让会员在共享尊崇礼遇的同时，绽放品味与格调，书写属于自己的传奇篇章。
                    </p>
                </Col>
            </Row>

        </Container>
    );
};

export default AboutUs;
