import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

/**
 * StripeCheckoutButton
 * Props:
 * - priceId: string (Stripe price ID)
 * - amount: string (display only, e.g. "$20.00")
 * - title: string (product name)
 */
export default function StripeCheckoutButton({ priceId, amount, title }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3008/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });
            const data = await res.json();
            if (data.url) {
                window.open(data.url, "stripeCheckout", "width=600,height=800");
            } else {
                setMessage("Could not initiate payment.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Payment error. Please try again.");
        } finally {
            setLoading(false);
            setShow(false);
        }
    };

    return (
        <>
            {/* Your custom button */}
            <Button variant="primary" onClick={() => setShow(true)}>
                Pay {amount}
            </Button>

            {/* Floating Bootstrap Modal */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h5>{title}</h5>
                        <p className="text-muted">Amount: {amount}</p>
                        {message && <p className="text-danger">{message}</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-2"
                                />
                                Processing...
                            </>
                        ) : (
                            "Proceed to Pay"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
