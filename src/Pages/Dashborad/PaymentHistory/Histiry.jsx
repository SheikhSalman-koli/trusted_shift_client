import React from 'react';
import UseAuth from '../../../Context/Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';

const Histiry = () => {

    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const { isPending, data: paymentHistory = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <span className="loading loading-dots loading-xl"></span>
    }

    // console.log(paymentHistory);

    return (
        <div>
            {paymentHistory && paymentHistory.length > 0 ? (
                <div className="overflow-x-auto mt-6">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Parcel ID</th>
                                <th>Amount (৳)</th>
                                <th>Transaction ID</th>
                                <th>Paid By</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory?.map((payment, index) => (
                                <tr key={payment.transactionId}>
                                    <th>{index + 1}</th>
                                    <td>{payment.parcelId.slice(0, 8)}...</td>
                                    <td className="font-semibold text-green-600">৳{payment.amount}</td>
                                    <td className="text-xs break-all">{payment.transactionId}</td>
                                    <td>{payment.paidBy}</td>
                                    <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                                    {/* <td>{new Date(payment.paymentDate).toISOString()}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500 py-12">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                        alt="No data"
                        className="w-24 h-24 mx-auto mb-4 opacity-60"
                    />
                    <p className="text-lg font-medium">No payment history found</p>
                    <p className="text-sm text-gray-400">Your payments will appear here once made</p>
                </div>
            )}



        </div>
    );
};

export default Histiry;