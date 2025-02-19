import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const MemberPointMarket = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [loadingRedeem, setLoadingRedeem] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [redeemProduct, setRedeemProduct] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    const handleRedeemClick = (product, e) => {
        e.stopPropagation();
        // 关闭详情 Modal（如果已打开）
        setShowModal(false);
        // 设置当前兑换的商品，并显示确认兑换 Modal
        setRedeemProduct(product);
        setShowConfirmModal(true);
    };

    const closeSuccessModal = () => { //TODO:
        setShowSuccessModal(false);
        window.location.reload();
    };

    // Used for update user points (function break-up)
    const updateUserPoints = async () => {
        const endpoint = process.env.REACT_APP_CMS_API_ENDPOINT;
        const apiKey = process.env.REACT_APP_CMS_API_KEY;

        // 从 Cookie 中读取当前用户信息（假设存储在 "user.number" 和 "user.email" 中）
        const currUser = JSON.parse(Cookies.get('user'));

        // 构造查询 URL，通过 filter 和 [eq] 筛选对应用户（MembershipNumber 与 Email）
        const userQueryUrl = `${endpoint}/api/one-club-memberships?filters[MembershipNumber][$eq]=${currUser.number}&filters[Email][$eq]=${currUser.email}`;

        try {
            const userResponse = await fetch(userQueryUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                }
            });
            const userData = await userResponse.json();

            if (userResponse.ok && userData.data && userData.data.length > 0) {
                // 取查询到的第一个用户记录
                const userRecord = userData.data[0];
                const documentId = userRecord.documentId; // Strapi 后台用户的 documentId
                const oldPoints = userRecord.Points;
                const oldLoyalty = userRecord.Loyalty;

                // 计算新的积分和积分值
                const newPoints = oldPoints - redeemProduct.Price;
                const newLoyalty = oldLoyalty + redeemProduct.LoyaltyGain;

                // 构造更新数据的 payload
                const updatePayload = {
                    data: {
                        Points: newPoints,
                        Loyalty: newLoyalty
                    }
                };

                // 通过 PUT 方法更新用户信息
                const updateResponse = await fetch(`${endpoint}/api/one-club-memberships/${documentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(updatePayload)
                });

                if (updateResponse.ok) {
                    console.log("Updated successfully");
                } else {
                    const updateError = await updateResponse.json();
                    console.log("Error updating user info:", updateError.message);
                }

                // Update Cookie
                Cookies.set('user', JSON.stringify({
                    "name": currUser.name,
                    "number": currUser.number,
                    "email": currUser.email,
                    "class": currUser.class,
                    "exp": currUser.exp,
                    "points": newPoints,
                    "loyalty": newLoyalty,
                }), { expires: 7 });
            } else {
                console.log("User not found or error fetching user data");
            }
        } catch (error) {
            console.log("Error updating user info:", error);
        }
    }

    const comfirmRedeemNow = async () => {
        setLoadingRedeem(true);
        const currUser = JSON.parse(Cookies.get('user'));
        const couponSysEndpoint = process.env.REACT_APP_COUPON_SYS_ENDPOINT;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        const couponPayload = {
            title: redeemProduct.Name,
            description: redeemProduct.Description,
            expiry: expiryDate.toISOString(),
            assigned_from: redeemProduct.Provider,
            assigned_to: currUser.name,
        };

        try {
            const couponResponse = await fetch(`${couponSysEndpoint}/create-active-coupon`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(couponPayload),
                mode: 'cors',
                credentials: 'include'
            });
            const couponData = await couponResponse.json();

            if (couponResponse.ok && couponData.couponStatus === "active") {
                const QRdata = couponData.QRdata;

                // Step 2: 调用 Email API 发送兑换信息
                const emailApiEndpoint = process.env.REACT_APP_EMAIL_API_ENDPOINT;
                const emailPayload = {
                    name: currUser.name,
                    email: currUser.email,
                    data: QRdata,
                    title: redeemProduct.Name
                };

                const emailResponse = await fetch(`${emailApiEndpoint}/1club/coupon_distribute`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(emailPayload),
                    mode: 'cors',
                    credentials: 'include'
                });

                if (emailResponse.ok) {
                    updateUserPoints();
                    console.log("Redeemed.");
                    setLoadingRedeem(false);
                    setShowConfirmModal(false);
                    setShowSuccessModal(true);
                } else {
                    const emailError = await emailResponse.json();
                    console.log("Email API error:", emailError.message);
                    setLoadingRedeem(false);
                }
            } else {
                console.log("Coupon system error:", couponData.message);
                setLoadingRedeem(false);
            }
        } catch (error) {
            console.log("Error in comfirmRedeemNow:", error);
            setLoadingRedeem(false);
        }
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
                                        onClick={(e) => handleRedeemClick(product, e)}
                                    >
                                        现在兑换
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Modal - 商品详细信息 */}
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
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={(e) => handleRedeemClick(selectedProduct, e)}
                        >
                            现在兑换
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Modal - 确认兑换 */}
            {redeemProduct && (
                <Modal
                    show={showConfirmModal}
                    onHide={() => {
                        setShowConfirmModal(false);
                        setRedeemProduct(null);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>确认兑换</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>商品：{redeemProduct.Name}</p>
                        {(() => {
                            // 从 cookie 中读取点数和积分
                            const userData = JSON.parse(Cookies.get('user'));
                            const cookiePoints = userData.points || 0;
                            const cookieLoyalty = userData.loyalty || 0;
                            return (
                                <>
                                    <p>
                                        会员点数：{cookiePoints} → {cookiePoints - redeemProduct.Price}
                                    </p>
                                    <p>
                                        积分：{cookieLoyalty} → {cookieLoyalty + redeemProduct.LoyaltyGain}
                                    </p>
                                </>
                            );
                        })()}
                    </Modal.Body>
                    <Modal.Footer>
                        {(() => {
                            const cookiePoints = JSON.parse(Cookies.get('user')).points || 0;
                            const sufficient = cookiePoints >= redeemProduct.Price;
                            return (
                                <Button
                                    variant={sufficient ? "dark" : "secondary"}
                                    className="w-100"
                                    disabled={!sufficient}
                                    onClick={comfirmRedeemNow}
                                >
                                    {sufficient ? (loadingRedeem ? "正在为您兑换.." : "兑换") : "积分不足"}
                                </Button>
                            );
                        })()}
                    </Modal.Footer>
                </Modal>
            )}

            {redeemProduct && showSuccessModal && (
                <Modal
                    show={showSuccessModal}
                    onHide={() => closeSuccessModal()}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{redeemProduct.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
                        <p className="mt-3">兑换成功，我们已将优惠券发送至您的邮箱。</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => closeSuccessModal()}
                        >
                            确定
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}


        </Container>
    );
};

export default MemberPointMarket;
