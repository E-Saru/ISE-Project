// // src/components/PaymentForm.js
// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// // Your PayPal client ID
// const PAYPAL_CLIENT_ID = 'AbS4ilAHZC7R97S_E1wKuJl7XpgYI7sNln9srjpQSUaAkTtu4dA3soRdWICuHbsalROz4dkWbT21m93U';

// const PaymentForm = () => {
//   return (
//     <div>
//       <h2>Pay with PayPal</h2>
//       <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
//         <PayPalButtons
//           createOrder={(data, actions) => {
//             return fetch('http://localhost:5000/api/pay', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ amount: '5.00' })  // Adjust amount as needed
//             })
//             .then(response => response.json())
//             .then(data => {
//               return data.paymentID;  // Return the PayPal payment ID
//             });
//           }}
//           onApprove={(data, actions) => {
//             return fetch(`http://localhost:5000/api/payment/execute?paymentId=${data.paymentID}&PayerID=${data.payerID}`, {
//               method: 'GET',
//             })
//             .then(response => response.json())
//             .then(data => {
//               if (data.message === 'Payment successful') {
//                 // Handle successful payment (e.g., show a message to the user)
//               } else {
//                 // Handle payment error
//               }
//             });
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// };

// export default PaymentForm;



import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Your PayPal client ID
const PAYPAL_CLIENT_ID = 'AbS4ilAHZC7R97S_E1wKuJl7XpgYI7sNln9srjpQSUaAkTtu4dA3soRdWICuHbsalROz4dkWbT21m93U';

const PaymentForm = () => {
  // Define inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    },
    header: {
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Pay with PayPal</h2>
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <div style={styles.buttonContainer}>
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
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentForm;
