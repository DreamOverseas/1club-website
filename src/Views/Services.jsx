import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Services.css";
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';

const servicesData = [
    {
        title: '私人岛屿 · 法式豪宅 Chateau Le Marais',
        description: `位于 Wallis 岛深处、被 584 公顷原始国家公园环抱的五层宫殿级庄园，不仅拥有从古董商 Andre 与 Cecile Fink 夫妇执念打造的珍稀古董与法式奢华装饰，还配备了完整的自发电及太阳能系统，实现全天候的独立运转与可持续度假体验。这里的每一砖一瓦都彰显匠心，私人码头与直升机停机坪更让尊贵之旅触手可及。1Club 荣幸与 Chateau Le Marais 深度合作，为会员专享私人导览、定制宴会与顶级管家服务，将法式优雅度假体验提升至极致，每一次到访都如至臻殿堂般难忘。`,
        img: '/service/chateau.webp',
        link: 'https://chateaulemarais.au/',
    },
    {
        title: '世贸中心 · WTC Elite Club',
        description: `坐落于墨尔本世贸中心头等舱楼层的 WTC Elite Club，以“协作、诚信、卓越”为核心价值，提供前所未有的定制化会晤空间与隽永服务。无论是高端商务谈判、跨国项目启动会，还是贵宾定制晚宴，场地都可根据贵宾需求进行灵活布局，并可配备专属礼宾、顶级餐饮与多语种同传等全方位支持。1Club 与 WTC Elite Club 紧密携手，为会员定制专属会员卡及优先预约权益，让每一次商务社交都畅达无阻，助力会员在全球舞台上赢得信任与尊崇。`,
        img: '/service/wtc_1club.jpg',
        link: 'https://wtceliteclub.com.au/about/',
    },
    {
        title: '罗塞尼斯半岛度假村 · Roseneath Holiday Park',
        description: `坐落于维州 Lake Wellington 南岸的 174 英亩原始湖滨丛林度假胜地，以其 2 公里湖滨沙滩、季节性露天泳池、专业烧烤区和全方位露营厨房闻名，是家庭与好友亲近自然的理想之选。豪华小屋、独立度假屋与房车营位配置齐全，内部均设有暖心壁炉与私享小厨房，而公区免费高速 Wi-Fi 与儿童游乐设施则兼顾现代舒适与亲子友好。1Club 与 Roseneath Holiday Park 深度合作，专为会员推出尊享帐篷豪华升级和定制湖畔私享活动，如清晨瑜伽、帆船巡游与名厨野炊，让静谧与探险交织的假日更加丰富难忘。`,
        img: '/service/rhp_1club.jpg',
        link: 'https://roseneathholidaypark.au/',
    },
    {
        title: '全球度假网络 · ThirdHome',
        description: `ThirdHome 作为全球领先的豪宅交换平台，汇聚逾 17,500 处顶级别墅、庄园及游艇，覆盖 100 多个国家，会员通过贡献自有度假物业的闲置时段即可获得可观旅行积分，实现平均 90% 的度假成本节省。平台还提供专属策展旅行、艺术品投资咨询与家居设计顾问等增值服务，让每一次旅行不仅是度假，更是生活方式的升级。1Club 与 ThirdHome 密切联动，为会员开通专属快速审核通道、定制行程规划和 VIP 礼遇，确保您在全球豪华庄园间自由穿梭，体验无与伦比的私享度假典范。`,
        img: '/service/thirdhome.jpg',
        link: 'https://www.thirdhome.com/',
    },
];

const Services = () => {

    return (
        <Container className="page-body-1club" >
            <Helmet>
                <title>1# Club Services</title>
                <meta name="description" content="Prize display of 1# Club, the private club for high-end customers." />
                <meta name="keywords" content="Private Club, High-end, Club, Membership, Holiday, Accomadation, Service, Landscape" />
            </Helmet>

            <div className="sticky-navbar-page-start-placeholder" />

            {servicesData.map((service, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                    <Row className={`d-flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} align-items-center py-4`}>
                        <Col md={6} className="px-0">
                            <img
                                src={service.img}
                                alt={service.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '1rem',
                                }}
                            />
                        </Col>
                        <Col
                            md={6}
                            className="d-flex flex-column justify-content-center"
                            style={{ color: '#000', marginTop: '1rem' }}
                        >
                            <h2 style={{ color: '#000', marginBottom: '1rem' }}>
                                {service.title}
                            </h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                {service.description}
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button
                                    variant="primary"
                                    style={{
                                        backgroundColor: '#87CEEB',
                                        borderColor: '#87CEEB',
                                        color: '#000',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '1rem',
                                        borderRadius: '2rem',
                                    }}
                                    href={service.link}
                                    target="_blank"
                                >
                                    了解详情
                                </Button>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            ))}
        </Container>
    );
};

export default Services;
