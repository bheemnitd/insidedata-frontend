import React, { useEffect } from 'react';

const RazorpayPayment = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openRazorpayCheckout = () => {
    var options = {
      "key": "YOUR_KEY_ID", // Enter your Razorpay Key ID
      "amount": "50000", // Amount is in currency subunits (e.g., paise for INR)
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "order_IluGWxBm9U8zJ8", // Sample Order ID. Replace with your actual Order ID
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };

    var rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button id="rzp-button1" onClick={openRazorpayCheckout}>Pay with Razorpay</button>
  );
};

export default RazorpayPayment;
