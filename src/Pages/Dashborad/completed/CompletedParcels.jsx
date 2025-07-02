import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Context/Hook/UseAuth";
import UseAxiosSecure from "../../../Context/Hook/UseAxiosSecure";
import Swal from "sweetalert2";


const CompletedParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['completed-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const calculateEarning = (parcel) => {
        const sameDistrict =
            parcel.senderServiceCenter === parcel.receiverServiceCenter;
        const rate = sameDistrict ? 0.2 : 0.3;
        return parcel.deliveryCost * rate;
    };


    const handleCashout = async (parcel) => {
        const confirm = await Swal.fire({
            title: 'Confirm Cashout?',
            text: 'Do you want to cash out your earnings now?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cashout',
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.post('/cashout', {
                riderEmail: user?.email,
                parcelId: parcel._id
            });

            if (res.data?.success) {
                Swal.fire(
                    'Cashout Requested!',
                    `Total Amount: ৳${res.data.totalAmount}`,
                    'success'
                );
                refetch?.();
            } else {
                Swal.fire('Oops', res.data?.message || 'Nothing to cash out', 'info');
            }
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Completed Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Delivered At</th>
                            <th>Cost</th>
                            <th>earing</th>
                            <td>Cashout</td>
                        </tr>
                    </thead>
                    <tbody>

                        {parcels.map((parcel, index) =>
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td>{parcel.title}</td>
                                <td>{parcel.type}</td>
                                <td>{parcel.senderName}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{new Date(parcel.updatedAt || parcel.deliveryTime || parcel.creation_date).toLocaleDateString()}</td>
                                <td>৳{parcel.deliveryCost}</td>
                                <td>{parcel.cashout_status ? "00" : calculateEarning(parcel).toFixed(2)}</td>
                                <td>
                                    <button 
                                    disabled={parcel.cashout_status}
                                    onClick={()=>handleCashout(parcel)} 
                                    className="btn btn-sm text-black btn-primary">
                                      Cashout
                                    </button>
                                </td>
                            </tr>
                        )}

                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500 py-6">
                                    No completed parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedParcels;
