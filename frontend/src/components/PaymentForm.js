// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { processPayment } from '../api';

// const PaymentForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//             });
//             const response = await processPayment({ payment_method_id: paymentMethod.id });
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit">Pay</button>
//         </form>
//     );
// };

// export default PaymentForm;

// src/components/PaymentForm.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Your PayPal client ID
const PAYPAL_CLIENT_ID = 'AbS4ilAHZC7R97S_E1wKuJl7XpgYI7sNln9srjpQSUaAkTtu4dA3soRdWICuHbsalROz4dkWbT21m93U';

const PaymentForm = () => {
  return (
    <div>
      <h2>Pay with PayPal</h2>
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return fetch('http://localhost:5000/api/pay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount: '5.00' })  // Adjust amount as needed
            })
            .then(response => response.json())
            .then(data => {
              return data.paymentID;  // Return the PayPal payment ID
            });
          }}
          onApprove={(data, actions) => {
            return fetch(`http://localhost:5000/api/payment/execute?paymentId=${data.paymentID}&PayerID=${data.payerID}`, {
              method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
              if (data.message === 'Payment successful') {
                // Handle successful payment (e.g., show a message to the user)
              } else {
                // Handle payment error
              }
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentForm;
