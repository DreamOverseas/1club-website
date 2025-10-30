import React from "react";
import { Container } from "react-bootstrap";

const PaymentStatusPage = () => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const canceled = params.get("canceled");

    let icon = "bi-question-circle";
    let message = "未知错误，请联系我们，我们会为您解决一切问题。";
    let color = "text-secondary";

    if (canceled === "true") {
        icon = "bi-x-circle";
        message = "支付已取消，请您返回后重新尝试或选择规格。";
        color = "text-warning";
    } else if (success === "true") {
        icon = "bi-check-circle";
        message = "支付成功，感谢您对我们的支持！";
        color = "text-success";
    } else if (success === "false") {
        icon = "bi-exclamation-triangle";
        message = "支付失败，请检查您的支付方式后重新尝试。";
        color = "text-danger";
    }

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
            }}
        >
            <Container>
                <i className={`bi ${icon} ${color}`} style={{ fontSize: "5rem" }}></i>
                <h2 className="mt-3">{message}</h2>
                <p className="mt-3 text-muted">您现在可以关闭此窗口。</p>
            </Container>
        </div>
    );
};

export default PaymentStatusPage;
