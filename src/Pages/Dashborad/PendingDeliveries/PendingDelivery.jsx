import React from 'react';
import UseAuth from '../../../Context/Hook/UseAuth';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';
import Loader from '../../../Components/Loadeer/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCreateTracking from '../../../Context/Hook/useCreateTracking';

const PendingDelivery = () => {

    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const queryClient = useQueryClient()
    const {createTracking} = useCreateTracking()

    const {
        data: parcels = [],
        isLoading,
    } = useQuery({
        queryKey: ['riderParcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider-pending?email=${user.email}`
            );
            return res.data;
        },
    });
    //   console.log(parcels);
    
        const updateStatus = useMutation({
            mutationFn: ({ parcel, newStatus }) =>
                axiosSecure.patch(`/parcels/${parcel._id}/status`, {
                    delivery_status: newStatus,
                    riderEmail: user?.email
                }),
            onSuccess: () => {
                queryClient.invalidateQueries(['riderParcels', user?.email]);
            },
        });

    if (isLoading) {
        return <Loader></Loader>
    }

    const handleStatusChange = async (parcel, newStatus, alertText) => {
        const confirm = await Swal.fire({
            title: 'Confirm',
            text: alertText,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        });
        if (confirm.isConfirmed) {
            updateStatus.mutate({ parcel, newStatus });
            // create tracking collection
            let trackDetails = `picked up by ${user?.displayName}`
            if(newStatus === 'delivered'){
                `delivered by ${user?.displayName}`
            }
            await createTracking({
               trackingId: parcel.trackingId,
               status: newStatus,
               details: trackDetails,
               created_by: parcel?.created_by
           })

            Swal.fire('Updated', 'Status updated successfully', 'success');
        }

    }

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Pending Parcels</h2>

                {parcels.length === 0 ? (
                    <p className="text-gray-500">No pending parcels.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Tracking&nbsp;ID</th>
                                    <th>Sender&nbsp;Center</th>
                                    <th>Receiver&nbsp;Center</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {parcels.map((p, idx) => (
                                    <tr key={p._id}>
                                        <td>{idx + 1}</td>
                                        <td className="capitalize">{p.title}</td>
                                        <td className="text-xs break-all">{p.trackingId}</td>
                                        <td className="whitespace-nowrap">{p.senderServiceCenter}</td>
                                        <td className="whitespace-nowrap">{p.receiverServiceCenter}</td>
                                        <td>
                                            <span
                                                className={`badge capitalize ${p.delivery_status === 'rider-assigned'
                                                    ? 'badge-warning'
                                                    : 'badge-info'
                                                    }`}
                                            >
                                                {p.delivery_status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {p.delivery_status === 'rider-assigned' && (
                                                <button
                                                    className="btn btn-xs btn-primary text-black"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            p,
                                                            'in-transit',
                                                            'Mark this parcel as picked up?'
                                                        )
                                                    }
                                                >
                                                    <FaCheckCircle className="mr-1" /> Picked&nbsp;Up
                                                </button>
                                            )}

                                            {p.delivery_status === 'in-transit' && (
                                                <button
                                                    className="btn btn-xs btn-success text-black"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            p,
                                                            'delivered',
                                                            'Mark this parcel as delivered?'
                                                        )
                                                    }
                                                >
                                                    <FaCheckCircle className="mr-1" /> Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default PendingDelivery;