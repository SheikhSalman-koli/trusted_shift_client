import React from 'react';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';
import Loader from '../../../Components/Loadeer/Loader';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllowWithdraw = () => {

    const axiosSecure = UseAxiosSecure()

    const {
        data: cashouts = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ["cashouts", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/cashouts/allow");
            return res.data; // array of { _id, riderEmail, totalAmount, request_date, parcelIds, status }
        },
    });

    const approveMutation = useMutation({
        mutationFn: async (id) =>
            axiosSecure.patch(`/cashouts/${id}`, { status: "approved" }),
        onSuccess: () => {
            // refresh the list so it disappears from "pending"
            // QueryClient.invalidateQueries({ queryKey: ["cashouts", "pending"] });
            refetch()
        },
    });

    if (isLoading) return <Loader></Loader>
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;


    const handleApprove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to approve this cashout request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e", // green
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate(id);
            }
        });
    };



    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Pending Cash‑out Requests</h2>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                    {/* DaisyUI's .table provides nice base styling */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Rider Email</th>
                            <th>Amount (৳)</th>
                            <th>Parcels</th>
                            <th>Requested At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cashouts.map((co, idx) => (
                            <tr key={co._id} className="hover">
                                <td>{idx + 1}</td>
                                <td>{co.riderEmail}</td>
                                <td>{Number(co.totalAmount).toFixed(2)}</td>
                                <td>{co.parcelIds?.length ?? 0}</td>
                                <td>
                                    {new Date(co.request_date).toLocaleString("en-BD", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>
                                <td>
                                    <span className="badge badge-warning badge-outline capitalize">
                                        {co.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-success"
                                        // disabled={approveMutation.isPending}
                                        onClick={() => handleApprove(co._id)}
                                    >
                                        {/* {approveMutation.isPending ? "Approving…" : "Approve"} */}
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cashouts.length === 0 && (
                    <p className="text-center mt-4 text-gray-500">No pending requests.</p>
                )}
            </div>
        </div>
    );
};

export default AllowWithdraw;