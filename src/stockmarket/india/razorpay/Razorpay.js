import React, { useState } from 'react';

const RazorpayComponent = () => {
  const [paymentId, setPaymentId] = useState(null);

  const options = {
    key: 'YOUR_RAZORPAY_KEY', // Enter your Razorpay API key here
    amount: 50000, // Amount is in paisa. 1000 = ₹10
    currency: 'INR',
    name: 'Your Company Name',
    description: 'Test Transaction',
    image: 'https://your-company-logo.png',
    order_id: paymentId,
    handler: function(response) {
      alert(response.razorpay_payment_id);
      // Handle success
    },
    prefill: {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999'
    },
    notes: {
      address: 'Razorpay Corporate Office'
    },
    theme: {
      color: '#F37254'
    }
  };

  const generatePayment = () => {
    fetch('YOUR_BACKEND_ENDPOINT_FOR_PAYMENT_GENERATION', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency
      })
    })
    .then(response => response.json())
    .then(data => {
      setPaymentId(data.id);
      const rzp = new window.Razorpay(options);
      rzp.open();
    })
    .catch(error => console.error('Error generating payment:', error));
  };

  return (
    <div>
      <button onClick={generatePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayComponent;
