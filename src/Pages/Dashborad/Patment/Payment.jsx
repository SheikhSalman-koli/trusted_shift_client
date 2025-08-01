import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import SslPaymentForm from './SslPaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

const Payment = () => {
   const [method, setMethod] = useState('stripe')

   return (
      <div className="p-4 m-4 w-[700px] rounded shadow">
         <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

         {/* radio button */}
         <div className="flex flex-col gap-2 mb-6">
            <label className="flex items-center gap-2">
               <input
                  type="radio"
                  value="stripe"
                  checked={method === "stripe"}
                  onChange={(e) => setMethod(e.target.value)}
               />
               Stripe
            </label>
            <label className="flex items-center gap-2">
               <input
                  type="radio"
                  value="ssl"
                  checked={method === "ssl"}
                  onChange={(e) => setMethod(e.target.value)}
               />
               SSLCommerz
            </label>
         </div>

         {
            method === "stripe" &&
            <Elements stripe={stripePromise}>
               <PaymentForm></PaymentForm>
            </Elements>
         }

         {
            method === 'ssl' &&
            <SslPaymentForm></SslPaymentForm>
         }

      </div>
   );
};

export default Payment;