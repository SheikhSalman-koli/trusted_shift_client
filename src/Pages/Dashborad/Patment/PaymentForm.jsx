import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';
import UseAuth from '../../../Context/Hook/UseAuth';
import Swal from 'sweetalert2';
import useCreateTracking from '../../../Context/Hook/useCreateTracking';

const PaymentForm = () => {

    const [error, setError] = useState('')
    const { parcelId } = useParams()
    // console.log(parcelId);
    // const [isDisable, setIsDisable] = useState(false)
    const { user } = UseAuth()
    const navigate = useNavigate()
    const axiosSecure = UseAxiosSecure()
    const { createTracking } = useCreateTracking()

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure(`/parcels/${parcelId}`)
            return res.data
        }
    })
    // console.log(parcelInfo);

    if (isPending) {
        return <span className="loading loading-dots loading-xl"></span>
    }

    const price = parcelInfo.deliveryCost;
    const priceInCents = price * 100;

    const stripe = useStripe()
    const elements = useElements()

    const handlePayment = async (e) => {
        e.preventDefault()

        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        if (!stripe || !elements) {
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement)

        if (!card) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        // 1- validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
            // console.log(error);
        } else {
            setError('')
            console.log('payment method', paymentMethod);

            // 2- create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                priceInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret

            // step-3: confirm message
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    // console.log('Payment succeeded');
                    // setIsDisable(true)
                    const transactionId = result.paymentIntent.id
                    // step-4: mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        amount: priceInCents,
                        transactionId: transactionId,
                        paidBy: user.email
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData)

                    if (paymentRes.data.paymentId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `
                              <p class="text-base">Transaction ID:</p>
                              <p class="text-sm font-mono bg-gray-100 p-2 rounded text-gray-700">${transactionId}</p>
                              <br/>
                              <button id="go-to-parcels" class="swal2-confirm swal2-styled bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                Go to My Parcels
                              </button>
                            `,
                            showConfirmButton: false,
                            didOpen: () => {
                                const btn = Swal.getPopup().querySelector('#go-to-parcels');
                                btn.addEventListener('click', () => {
                                    Swal.close();
                                    // create tracking collection
                                    createTracking({
                                        trackingId: parcelInfo.trackingId,
                                        status: 'parcel_payment',
                                        details: `Created by ${parcelInfo?.senderName}`,
                                        created_by: parcelInfo?.created_by
                                    })
                                    navigate('/dashboard/myparcel');
                                });
                            },
                        });

                    }
                }
            }

        }



    }

    return (
        <form onSubmit={handlePayment} className="max-w-md w-full mx-auto p-4 bg-white rounded shadow space-y-4 mt-5">
            <CardElement className='p2 border rounded'>
            </CardElement>

            <button
                className="btn btn-primary text-black w-full"
                type='submit'
                disabled={!stripe}
            >
                pay ৳:{price}
            </button>
            {
                error && <p className='text-red-500'>{error}</p>
            }
        </form>
    );
};

export default PaymentForm;