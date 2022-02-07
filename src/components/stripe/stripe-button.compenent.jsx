import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken= token => {
    console.log(token);
    alert('Paymnet succesful!!')
}

const StripeCheckoutButton = ({ price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KQbxAG8ZkU8MTKo2xXYReG5mwxa378GmtM2WFXxmNY94GAz7jXbAuqyvckV6WXKQV8YL6aJ8YjQLKjR0ngcsShx00L61DqZ1b';

    return (
        <StripeCheckout
            label='Pay Now'
            name='My shit App'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}


        />
    );
};

export default StripeCheckoutButton;