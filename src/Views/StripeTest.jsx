import StripeCheckoutButton from "../Components/StripeCheckoutButton";

function StripeTest() {
    return (
        <>
            <div className="sticky-navbar-page-start-placeholder" />
            <div className="card text-center p-3">
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="Book Cover"
                    className="card-img-top mx-auto"
                    style={{ width: "150px" }}
                />
                <div className="card-body">
                    <h5 className="card-title">Not Yet a Product</h5>
                    <p className="card-text">$20.00</p>
                    <StripeCheckoutButton
                        priceId="price_1SNlkw748iCYpCCmDYaBX0Yj"
                        amount="$20.00"
                        title="Not Yet a Product"
                    />
                </div>
            </div>
            <div className="card text-center p-3">
                <img
                    src="logo512.png"
                    alt="Book Cover"
                    className="card-img-top mx-auto"
                    style={{ width: "150px" }}
                />
                <div className="card-body">
                    <h5 className="card-title">Nah Once the Test</h5>
                    <p className="card-text">$5.00</p>
                    <StripeCheckoutButton
                        priceId="price_1SNqf0748iCYpCCmOXu9HK7Q"
                        amount="$5.00"
                        title="Nah Once the Test"
                    />
                </div>
            </div>
        </>
    );
}

export default StripeTest;
