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
                    <h4 className="home-subtitle">欢迎来到1号俱乐部，感受独特与卓越的碰撞</h4>
                </div>

                <div className="home-scroll-indicator">
                    <p>下滑展示更多内容</p>
                </div>
            </div>

            <Container> {/* Boardered contents starting here */}

                <Row className="home-section">
                    <Col md={4} className="d-flex home-icon-container">
                        <Image src="/Icons/Travel.png" className="home-section-icon" />
                    </Col>
                    <Col md={8} className="home-section-text">
                        <h1>世界任君探索</h1>
                        <p>通过我们独家的旅行服务，在 90 多个国家/地区选择您的心仪目的地，这些服务由享有盛誉的 Thirdhome 提供支持。从豪华别墅到令人叹为观止的度假胜地，我们为您提供无与伦比的旅程，以满足您的愿望。沉浸在一个奢华与冒险相遇的世界里，每一次度假都是一次非凡的体验。</p>
                    </Col>
                </Row>
                <Row className="home-section">
                    {onDesktop ? <></> :
                        <Col md={4} className="d-flex home-icon-container">
                            <Image src="/Icons/Accomadation.png" className="home-section-icon" />
                        </Col>
                    }
                    <Col md={8} className="home-section-text-rev">
                        <h1>无与伦比的高端生活</h1>
                        <p>通过我们独家的住宿服务，沉浸在精致生活的艺术中。从私人岛屿上优雅的法式别墅到宁静的度假公园、迷人的农场住宿和风景如画的葡萄园，我们的服务专为寻求非凡体验的客人而打造。尽情享受精心策划的活动，品尝新鲜的岛屿海鲜和水果，并将独特的纪念品带回家，珍藏您的旅程。每次入住都是对我们俱乐部精致房地产组合之美的奢华庆祝。</p>
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
                        <h1>属于精英人士的圈子</h1>
                        <p>成为我们的专属会员，体验无与伦比的特权。从豪华假期和高级住宿到享有盛誉的选美比赛和高级商务和社交活动，我们的俱乐部为您提供非凡机会。会员资格需通过邀请或严格的审批程序，以确保社区中志同道合、重视卓越和专属的个人。</p>
                    </Col>
                </Row>

                <Row className="home-section justify-content-between">
                    <h1>荣誉合作</h1> <br />
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
