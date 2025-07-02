import React from 'react';

const ParcelTable = ({ parcels = [], onView, onPay, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td className="capitalize">{parcel.type}</td>
              <td>{parcel.title}</td>
              <td>{parcel.deliveryCost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === 'paid'
                      ? 'badge-success'
                      : 'badge-error'
                  } text-white`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-outline btn-info"
                  onClick={() => onView(parcel)}
                >
                  View
                </button>
                <button
                  disabled={parcel.payment_status === 'paid'}
                  className={`btn btn-xs btn-outline btn-success`}
                  onClick={() => onPay(parcel._id)}
                >
                  Pay
                </button>
                <button
                // disabled={parcel.payment_status === 'paid'}
                  className="btn btn-xs btn-outline btn-error"
                  onClick={() => onDelete(parcel._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
          {parcels.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
