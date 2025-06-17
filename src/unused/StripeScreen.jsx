// import React, { useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import Image from "next/image";

// export default function CheckoutForm({
//   onPaymentSuccess,
//   showPayment,
//   paymentAmount,
//   processingFee,
//   totalAmount,
//   handleAmount,
//   handleIntent,
//   handleAmountInput,
//   setPaymentAmount,
//   minError,
//   setMinError,
// }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [isPaymentComplete, setIsPaymentComplete] = React.useState(false);
//   const [newAmount, setNewAmount] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.href,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       if (error.type === "card_error" || error.type === "validation_error") {
//         setMessage(error.message);
//       } else {
//         setMessage("An unexpected error occurred.");
//       }
//       setIsPaymentComplete(false);
//     } else {
//       setMessage("¡Pago realizado con éxito!");
//       setIsPaymentComplete(true);
//       if (onPaymentSuccess) {
//         onPaymentSuccess();
//       }
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   if (isPaymentComplete) {
//     return (
//       <div className="stripe-form">
//         <Image
//           className="close-form"
//           onClick={() => {
//             showPayment(false);
//           }}
//           alt=""
//           src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6897d36a-e5cf-47c8-8459-5c9d61863300/public"
//           width={20}
//           height={20}
//         />
//         <div className="payment-success-message">
//           <Image
//             alt=""
//             width={160}
//             height={80}
//             src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/df05ccbf-3a30-4c9d-1360-1f18e19bef00/public"
//           />
//           <h3>Successful Payment</h3>
//         </div>
//       </div>
//     );
//   }

//   const handleEnter = (e) => {
//     if (e.key === "Enter" && newAmount >= 5) {
//       e.preventDefault();
//       setPaymentAmount(newAmount);
//       handleAmount(newAmount);
//       handleIntent(newAmount);
//       setMinError("");
//     } else if (newAmount <= 5 && e.key === "Enter") {
//       setMinError("Minimum deposit is 5 USD");
//     }
//   };

//   return (
//     <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
//       <Image
//         className="close-form"
//         onClick={() => {
//           showPayment(false);
//         }}
//         alt=""
//         src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6897d36a-e5cf-47c8-8459-5c9d61863300/public"
//         width={20}
//         height={20}
//       />
//       <h3>Deposit funds with stripe</h3>
//       <div className="billing-buttons">
//         <button
//           type="button"
//           onClick={() => {
//             handleAmount(5);
//             handleIntent(5);
//           }}
//           className="stripe-button"
//         >
//           {" "}
//           Add $5
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             handleAmount(10);
//             handleIntent(10);
//           }}
//           className="stripe-button"
//         >
//           {" "}
//           Add $10
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             handleAmount(20);
//             handleIntent(20);
//           }}
//           className="stripe-button"
//         >
//           {" "}
//           Add $20
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             handleAmount(50);
//             handleIntent(50);
//           }}
//           className="stripe-button"
//         >
//           {" "}
//           Add $50
//         </button>
//       </div>
//       <div className="payment-container">
//         <div className="amount-header">
//           <span className="amount-label">Enter the amount</span>
//           <span className="minimum-amount">Minimum amount: $5.00</span>
//         </div>
//         <div className="amount-input">
//           <span className="currency-symbol">$</span>
//           <input
//             onChange={(e) => setNewAmount(Number(e.target.value))}
//             placeholder={paymentAmount}
//             value={newAmount || ""}
//             onKeyDown={handleEnter}
//           />
//         </div>
//         {minError !== "" ? (
//           <span className="error-message-login">{minError}</span>
//         ) : (
//           ""
//         )}
//       </div>
//       <div className="payment-summary">
//         <div className="payment-details">
//           <div className="payment-row">
//             <span>Processing Fee:</span>
//             <strong>{processingFee}</strong>
//           </div>
//           <div className="payment-row total">
//             <span>Deposit Amount:</span>
//             <strong>{totalAmount}</strong>
//           </div>
//         </div>
//         <div className="separador"></div>
//         <div className="payment-row total">
//           <span>Amount in USD:</span>
//           <strong>{paymentAmount.toFixed(2)}</strong>
//         </div>
//       </div>
//       <PaymentElement id="payment-element" options={paymentElementOptions} />

//       <button
//         className="stripe-button"
//         disabled={isLoading || !stripe || !elements}
//         id="submit"
//       >
//         <span id="button-text">
//           {isLoading ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Pay via stripe"
//           )}
//         </span>
//       </button>
//     </form>
//   );
// }
