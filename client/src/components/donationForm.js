import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [donationAmount, setDonationAmount] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement || !cardElement.complete) {
      console.log('Please enter a valid card number.');
      return;
    }

    // Confirm the payment with Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      amount: donationAmount,
      currency: 'cad',
    });

    if (!error) {
      //TODO Process the payment on your server and handle success
      console.log(paymentMethod);
    } else {
      console.log(error);
    }
  };

  const handleDonate = (donationAmount) => {
    setDonationAmount(donationAmount);
  };

  return (
    <>
      <div className="contentBody">
        <h1 className="title">DONATION</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="donationTitle">Select a Donation Amount:</h1>
            <button type="button" onClick={() => handleDonate(1)}>
              $1
            </button>
            <button type="button" onClick={() => handleDonate(2)}>
              $2
            </button>
            <button type="button" onClick={() => handleDonate(5)}>
              $5
            </button>
            <button type="button" onClick={() => handleDonate(10)}>
              $10
            </button>
            <button type="button" onClick={() => handleDonate(20)}>
              $20
            </button>
            <button type="button" onClick={() => handleDonate(50)}>
              $50
            </button>
          </div>
          <h1 className="donationTitle">
            Please enter your CC information Below
          </h1>
          <div className="ccInfo">
            <CardElement />
          </div>
          <button type="submit" disabled={!stripe}>
            Donate
          </button>
        </form>
      </div>
    </>
  );
};

export default DonationForm;
