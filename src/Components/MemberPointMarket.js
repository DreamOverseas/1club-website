import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const MemberPointMarket = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const endpoint = process.env.REACT_APP_CMS_API_ENDPOINT;
            const apiKey = process.env.REACT_APP_CMS_API_KEY;
            const url = `${endpoint}/api/one-club-products?populate=Icon`;

            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    }
                });
                const data = await response.json();

                let items = data.data || [];

                items.sort((a, b) => a.Order - b.Order);

                setProducts(items);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // 根据搜索关键字过滤商品（不区分大小写）
    const filteredProducts = products.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 点击 Card（除兑换按钮）时调用，设置选中商品并显示 Modal
    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // 关闭 Modal 时清空选中商品状态
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <Container className="my-4">
            <Row>
                <Col>
                    <h2>会员点商城 / Member's Point Redeem</h2>
                </Col>
                <Col>
                    <Form className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="搜索 / Search ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>

            <Row>
                {filteredProducts.map((product) => {
                    const { Name, Icon, Price, LoyaltyGain } = product;
                    const iconUrl =
                        Icon?.url
                            ? `${process.env.REACT_APP_CMS_API_ENDPOINT}${Icon.url}`
                            : '';

                    return (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card>
                                <Card.Body onClick={() => handleCardClick(product)} style={{ cursor: 'pointer' }}>
                                    <Card.Title>{Name}</Card.Title>
                                    {iconUrl && (
                                        <Card.Img
                                            variant="top"
                                            src={iconUrl}
                                            alt={Name}
                                            className="mb-3"
                                            style={{ objectFit: 'cover', height: '200px' }}
                                        />
                                    )}
                                    <Row className="text-center">
                                        <Col>
                                            <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
                                                <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                            </svg>+{LoyaltyGain}</div>
                                        </Col>
                                        <Col>
                                            <div>|</div>
                                        </Col>
                                        <Col>
                                            <div>
                                                {Price} 会员点
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        variant="dark"
                                        className="w-100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // 兑换按钮点击事件（具体功能待讨论）
                                        }}
                                    >
                                        现在兑换
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Modal 显示选中商品的详细信息 */}
            {selectedProduct && (
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProduct.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* 商品图片 */}
                        {selectedProduct.Icon &&
                            selectedProduct.Icon &&
                            selectedProduct.Icon && (
                                <img
                                    src={`${process.env.REACT_APP_CMS_API_ENDPOINT}${selectedProduct.Icon.url}`}
                                    alt={selectedProduct.Name}
                                    className="img-fluid mb-3"
                                />
                            )}
                        {/* 商品描述 */}
                        <p>{selectedProduct.Description}</p>
                        {/* 底部两列展示：左侧显示 “积分+” 与 LoyaltyGain，右侧显示 Price 与 “会员点” */}
                        <Row className="text-center">
                            <Col>
                                <div>积分<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
                                    <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                </svg>+{selectedProduct.LoyaltyGain}</div>
                            </Col>
                            <Col>
                                <div>|</div>
                            </Col>
                            <Col>
                                <div>
                                    {selectedProduct.Price} 会员点
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Modal 底部的兑换按钮 */}
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => {
                                // Modal 内兑换按钮点击事件（具体功能待讨论）
                            }}
                        >
                            现在兑换
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default MemberPointMarket;
