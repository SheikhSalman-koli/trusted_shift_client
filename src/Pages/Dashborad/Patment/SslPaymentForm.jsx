import React from 'react';
import { useParams } from 'react-router';
import UseAuth from '../../../Context/Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';

const SslPaymentForm = () => {

    const { parcelId } = useParams()
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()


    const { data: parcelInfo, isPending } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/${parcelId}`)
            return res?.data
        }
    })

    if (isPending) return <p>Loading...</p>


    const handleSslPayment =async (e) => {
        e.preventDefault()

        const newPaymentData = {
            percelId: parcelId,
            title: parcelInfo.title,
            amount: parcelInfo.deliveryCost,
            paidBy: user?.email,
            paymentMethod: "SSLCommerz",
            transactionId: "",
            status: "pending"
        };

        const res = await axiosSecure.post(`/create/ssl/payments`, newPaymentData)
        if(res?.data?.getWayUrl){
            window.location.replace(res?.data?.getWayUrl)
        }
        // console.log("okok boss", res);
    }

    return (
        <form
            onSubmit={handleSslPayment}
            className="space-y-4 border p-4 rounded bg-white shadow text-black"
        >
            <h3 className="text-lg font-semibold mb-2">SSLCommerz Payment</h3>

            {/* Display Parcel Info */}
            <div className="bg-gray-100 p-3 rounded text-sm ">
                <p>
                    <strong>title:</strong> {parcelInfo?.title}
                </p>
                <p>
                    <strong>Price:</strong> Tk. {parcelInfo?.deliveryCost}
                </p>
                <p>
                    <strong>Email:</strong> {user?.email}
                </p>
            </div>

            {/* Hidden Inputs for Backend (if needed) */}
            <input type="hidden" name="parcelName" value={parcelInfo?.parcelName} />
            <input type="hidden" name="price" value={parcelInfo?.cost} />
            <input type="hidden" name="userEmail" value={user?.email} />

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Pay with SSLCommerz
            </button>
        </form>
    );
};

export default SslPaymentForm;