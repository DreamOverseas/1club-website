import React from "react";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "react-responsive";
import "../Styles/Home.css";
import { Container, Row, Col, Image, Carousel, Button } from 'react-bootstrap';

const Home = () => {
    const onDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    const collabs = [{name:"Chateau", url: "https://chateaulemarais.au/"}, 
                    {name:"Thirdhome", url: "https://www.thirdhome.com/"}, 
                    {name:"36OMedia", url: "https://do360.com/"}, 
                    {name:"WCO", url: "https://world-cooperation.org/"}, 
                    {name:"MI", url: "https://missinternational.world/"}, 
                    {name:"DO", url: "https://do360.com/"}];

    return (
        <>
            <Helmet>
                <title>1# Club - 1号俱乐部</title>
                <meta name="description" content="Homepage - 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>

            <div className="landing-title-section">
                {/* Carousel as background */}
                <Carousel controls={true} indicators={true} fade interval={3600} className="bg-carousel">
                    <Carousel.Item>
                        <img
                            src="/homepage/bg.webp"
                            alt="background 1"
                            className="carousel-bg-img"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="/homepage/2.webp"
                            alt="background 3"
                            className="carousel-bg-img"
                        />
                    </Carousel.Item>
                </Carousel>

                {/* Foreground content */}
                <div className="home-title-container">
                    <h1 className="home-title">WELCOME TO 1# CLUB</h1>
                    <h4 className="home-subtitle">
                        欢迎来到1号俱乐部，感受独特与卓越的碰撞
                    </h4>
                </div>

                <div className="home-scroll-indicator">
                    <p>下滑展示更多内容</p>
                </div>
    </div>

            {/* Boardered contents starting here */}
            <Container> 
                {/* ===== Intro ===== */}
                <Row className="mb-1 mt-5">
                    <Col md={5} className="mb-4">
                        <Image src="/aboutus/clublemarais.png" alt="Club Le Marais" fluid rounded />
                    </Col>
                    <Col md={7}>
                        <div className="about-us-intro">
                            <br />
                            <h4><strong>构建全球精英社交平台</strong></h4>
                            <div className="text-align-left">
                                <br />
                                • 1号俱乐部成立于澳大利亚，这片多元文化的土地，是通向世界的桥梁。在这里，您无需远行，即可结识来自中国及全球各地的精英人群 •
                                <br />
                                • 作为一个专注于高进值人群的高端俱乐部，1号俱乐部携手 世界合作组织-WCO 资源，联通澳洲与海外会员网络，打造一个汇聚商业、文化与政治资源的国际化社交平台 •
                                <br />
                                • 专属会员制, 为您提供量身定制的高质量体验 •
                            </div>
                        </div>
                        <br/><br/>
                        <Button
                            variant="primary"
                            style={{
                                backgroundColor: '#87CEEB',
                                borderColor: '#81dbffff',
                                color: '#000',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                borderRadius: '2rem',
                            }}
                            href="/services"
                        >
                            服务详情
                        </Button>
                    </Col>
                </Row>

                {/* Various aspects */}
                <Row className="home-section">
                    <Col md={4} className="d-flex align-items-center justify-content-center home-icon-container">
                        <Image src="/Icons/Travel.png" className="home-section-icon" />
                    </Col>
                    <Col md={8} className="home-section-text">
                        <h1>世界任君探索</h1>
                        <p>通过我们独家的旅行服务，在 90 多个国家/地区选择您的心仪目的地。从豪华别墅到令人叹为观止的度假胜地，我们为您提供无与伦比的旅程，以满足您的愿望。沉浸在一个奢华与冒险相遇的世界里，每一次度假都是一次非凡的体验。</p>
                    </Col>
                </Row>
                <Row className="home-section">
                    {onDesktop ? <></> :
                        <Col md={4} className="d-flex align-items-center justify-content-center home-icon-container">
                            <Image src="/Icons/Accomadation.png" className="home-section-icon" />
                        </Col>
                    }
                    <Col md={8} className="home-section-text-rev">
                        <h1>无与伦比的高端生活</h1>
                        <p>通过我们独家的住宿服务，沉浸在精致生活的艺术中。从私人岛屿上优雅的法式别墅到宁静的度假公园、迷人的农场住宿和风景如画的葡萄园，我们的服务专为寻求非凡体验的客人而打造。尽情享受精心策划的活动，品尝新鲜的岛屿海鲜和水果，并将独特的纪念品带回家，珍藏您的旅程。每次入住都是对我们俱乐部精致房地产组合之美的奢华庆祝。</p>
                    </Col>
                    {onDesktop ?
                        <Col md={4} className="d-flex align-items-center justify-content-center home-icon-container">
                            <Image src="/Icons/Accomadation.png" className="home-section-icon" />
                        </Col>
                        : <></>
                    }
                </Row>
                <Row className="home-section">
                    <Col md={4} className="d-flex align-items-center justify-content-center home-icon-container">
                        <Image src="/Icons/Membership.png" className="home-section-icon" />
                    </Col>
                    <Col md={8} className="home-section-text">
                        <h1>属于精英人士的圈子</h1>
                        <p>成为我们的专属会员，体验无与伦比的特权。从豪华假期和高级住宿到享有盛誉的选美比赛和高级商务和社交活动，我们的俱乐部为您提供非凡机会。会员资格需通过邀请或严格的审批程序，以确保社区中志同道合、重视卓越和专属的个人。</p>
                    </Col>
                </Row>

                <Row className="home-section justify-content-between">
                    <h1>荣誉合作</h1> <br />
                    {collabs.map((collab) => (
                        <a className="home-collab-icon-container" href={collab.url} rel="noopener noreferrer" key={collab.name} target="_blank">
                            <Image className="home-collab-icons" src={`/collab/${collab.name}.png`} alt={`${collab.name}`} />
                        </a>
                    ))}
                </Row>
                <br />

            </Container>
        </>
    );
};

export default Home;
