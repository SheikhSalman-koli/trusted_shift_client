import { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import UseAxiosSecure from "../../../Context/Hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loadeer/Loader";


const PendingRiders = () => {
    const axiosSecure = UseAxiosSecure()
    // const [riders, setRiders] = useState([]);
    const [selectedRider, setSelectedRider] = useState(null);

    // useEffect(() => {
    //     axiosSecure.get("/riders/pending").then((res) => setRiders(res.data));
    // }, [axiosSecure]);

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['riders-pending'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending")
            return res.data
        }
    })

    if (isPending) {
        return <Loader></Loader>
    }

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this rider request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/riders/${id}`, { status: "rejected" });
                refetch()
                Swal.fire('Rejected!', 'Rider request has been rejected.', 'success');
            }
        });
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>
            {riders.length === 0 ? (
                <p className="text-gray-600">No pending riders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                {/* <th>Region</th> */}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider, idx) => (
                                <tr key={rider._id}>
                                    <td>{idx + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.contact}</td>
                                    {/* <td>{rider.region}</td> */}
                                    <td>
                                        <span className="badge badge-warning text-white capitalize">
                                            {rider.status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => setSelectedRider(rider)}
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            <FaEye className="inline" /> View
                                        </button>
                                        <button
                                            onClick={() => handleCancel(rider._id)}
                                            className="btn btn-sm btn-error text-white">
                                            <FaTimes className="inline" /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {selectedRider && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-3">Rider Details</h3>
                        <div className="space-y-1">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Contact:</strong> {selectedRider.contact}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.create_At).toLocaleString()}</p>
                        </div>
                        <div className="modal-action">
                            <button
                                onClick={() => setSelectedRider(null)}
                                className="btn btn-outline"
                            >
                                Close
                            </button>
                            <button
                                onClick={async () => {
                                    await axiosSecure.patch(`/riders/${selectedRider._id}`, {
                                        status: "approved",
                                        email: selectedRider.email
                                    });
                                    setSelectedRider(null);
                                    refetch()
                                    // const res = await axiosSecure.get("/riders/pending");
                                    // setRiders(res.data);
                                    Swal.fire('Success', 'Rider has been approved!', 'success');
                                }}
                                className="btn btn-success"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;
