import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Context/Hook/UseAxiosSecure";
import { MdCheckCircle, MdLocalShipping, MdAssignmentInd, MdCancel } from "react-icons/md";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


// Tailwind‑friendly colors for common statuses
const statusColors = {
    delivered: "success",
    "in-transit": "info",
    "rider-assigned": "warning",
    "not-collected": "error",
};

// Color map by status
const STATUS_COLORS = {
    delivered: "#22c55e",        // green-500
    "in-transit": "#3b82f6",     // blue-500
    "rider-assigned": "#eab308", // yellow-500
    "not-collected": "#ef4444",  // red-500
};

const statusIcons = {
    delivered: <MdCheckCircle className="text-3xl text-green-600" />,
    "in-transit": <MdLocalShipping className="text-3xl text-blue-500" />,
    "rider-assigned": <MdAssignmentInd className="text-3xl text-yellow-500" />,
    "not-collected": <MdCancel className="text-3xl text-red-500" />,
};


const AdminDashboard = () => {
    const axiosSecure = UseAxiosSecure();

    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ["delivery-status-aggregate"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcel/aggrigate/delivery_status");
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="p-4">Loading…</p>;
    }
    if (isError) {
        return <p className="p-4 text-red-500">Error: {error.message}</p>;
    }

    console.log(data);


    return (

        <div>
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Parcel Status Overview</h2>
                {/* DaisyUI grid of cards */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data.map(({ status, count }) => (
                        <div key={status} className="card bg-base-100 shadow-md">
                            <div className="card-body items-center">
                                {/* Icon */}
                                <div>{statusIcons[status] || <MdAssignmentInd className="text-3xl text-gray-400" />}</div>
                                <span
                                    className={`badge badge-${statusColors[status] || "neutral"} uppercase mb-2`}
                                >
                                    {status}
                                </span>
                                <h3 className="text-4xl font-bold">{count}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={STATUS_COLORS[entry.status] || "#8884d8"}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminDashboard;