import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import UseAxiosSecure from "../../../Context/Hook/UseAxiosSecure";
import Loader from "../../../Components/Loadeer/Loader";
import { useState } from "react";
import Swal from "sweetalert2";

const AssignRider = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);

    const { data: parcels = [], isLoading , refetch} = useQuery({
        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels/assigned?payment_status=paid&delivery_status=not-collected"
            );
            return res.data;
        },
    });
    //   console.log(parcels);
    const {
        data: riders = [],
        isLoading: ridersLoading,
    } = useQuery({
        queryKey: ["availableRiders", selectedParcel?.senderServiceCenter],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/available?district=${selectedParcel.senderServiceCenter}`
            );
            return res.data;
        },
    });



    if (isLoading || ridersLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader></Loader>
            </div>
        );
    }

    const availableRiders = selectedParcel ? riders.filter(r => r.district === selectedParcel.senderServiceCenter)
        : [];


    const handleAssignRider = async (parcel, rider) => {
        const result = await Swal.fire({
            title: 'Confirm Assignment',
            text: 'Do you want to assign this rider?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, assign',
        });

        if (result.isConfirmed) {
            // Update parcel delivery_status
            // Update rider work_status
            await axiosSecure.patch(`/assign-rider`, {
                parcelId: parcel._id,
                riderId: rider._id,
                riderName: rider.name,
                riderEmail: rider.email
            });
            // console.log(selectedparcelId, selectedriderId);

            Swal.fire('Assigned!', 'The rider has been assigned.', 'success');
            setSelectedParcel(null); 
            refetch(); 
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">No parcels awaiting assignment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Title</th>
                                <th>Tracking ID</th>
                                <th>Sender Center</th>
                                <th>Receiver Center</th>
                                <th>Payment&nbsp;Status</th>
                                <th>Delivery&nbsp;Status</th>
                                <th>Created&nbsp;At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((p, idx) => (
                                <tr key={p._id}>
                                    <td>{idx + 1}</td>
                                    <td className="capitalize">{p.title}</td>
                                    <td className="text-xs break-all">{p.trackingId}</td>
                                    <td className="text-sm whitespace-nowrap">{p.senderServiceCenter}</td>
                                    <td className="text-sm whitespace-nowrap">{p.receiverServiceCenter}</td>
                                    <td>
                                        <span className="badge badge-success capitalize">
                                            {p.payment_status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning capitalize text-sm">
                                            {p.delivery_status}
                                        </span>
                                    </td>
                                    <td className="text-sm text-gray-600 whitespace-nowrap">
                                        {new Date(p.creation_date).toLocaleDateString()}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-primary text-black"
                                            onClick={() => setSelectedParcel(p)}
                                        >
                                            <FaUserPlus className="mr-1" /> Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedParcel && (
                        <dialog open className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg mb-3">
                                    Riders in {selectedParcel.senderServiceCenter}
                                </h3>

                                {availableRiders.length === 0 ? (
                                    <div className="text-center text-gray-500 py-6">
                                        <p>No available riders in <strong>{selectedParcel.senderServiceCenter}</strong>.</p>
                                        <p>Please try again later or assign manually.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                                        {availableRiders.map((rider) => (
                                            <div key={rider._id}>
                                                <li

                                                    className="flex justify-between items-center bg-base-200 p-2 rounded"
                                                >
                                                    <span>{rider.name}</span>
                                                    <button
                                                        className="btn btn-xs btn-success"
                                                        onClick={() => handleAssignRider(selectedParcel, rider)}
                                                    >Select</button>
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                )}

                                <div className="modal-action">
                                    <button className="btn" onClick={() => setSelectedParcel(null)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    )}
                </div>
            )}
        </div>
    );
};

export default AssignRider;
