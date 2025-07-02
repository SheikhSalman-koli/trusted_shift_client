import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';
import UseAuth from '../../../Context/Hook/UseAuth';
import Loader from '../../../Components/Loadeer/Loader';

const getRangeDates = (filter) => {
  const now = new Date();
  const start = new Date();

  switch (filter) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'this_week':
      const day = now.getDay(); // 0 (Sun) to 6 (Sat)
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      break;
    case 'this_month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'this_year':
      start.setMonth(0);
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      return null;
  }

  return { start, end: now };
};

const EarningDetails = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [timeFilter, setTimeFilter] = useState(null); // e.g. 'today', 'this_week'

  const { data: cashouts = [], isLoading } = useQuery({
    queryKey: ['cashouts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cashouts?riderEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const filterByDate = (data, filter) => {
    if (!filter) return data;
    const { start, end } = getRangeDates(filter);
    return data.filter((item) => {
      const d = new Date(item.request_date);
      return d >= start && d <= end;
    });
  };

  const filteredCashouts = filterByDate(cashouts, timeFilter);

  const totalEarning = filteredCashouts.reduce((sum, r) => sum + r.totalAmount, 0);
  const pending = filteredCashouts
    .filter((r) => r.status === 'pending')
    .reduce((sum, r) => sum + r.totalAmount, 0);
  const cashedOut = filteredCashouts
    .filter((r) => r.status === 'approved')
    .reduce((sum, r) => sum + r.totalAmount, 0);

  if (isLoading) return <Loader></Loader>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Earning Details</h2>

      {/*  Time Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['today', 'this_week', 'this_month', 'this_year', null].map((filter) => (
          <button
            key={filter ?? 'all'}
            onClick={() => setTimeFilter(filter)}
            className={`btn btn-sm text-black ${timeFilter === filter ? 'btn-primary' : 'btn-outline'}`}
          >
            {filter ? filter.replace('_', ' ').toUpperCase() : 'ALL'}
          </button>
        ))}
      </div>

      {/*  Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-xl font-bold text-green-700">{totalEarning.toFixed(2)}৳</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{pending.toFixed(2)}৳</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Cashed Out</p>
          <p className="text-xl font-bold text-blue-600">{cashedOut.toFixed(2)}৳</p>
        </div>
      </div>

      {/* 
       Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredCashouts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{new Date(item.request_date).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'pending' ? 'badge-warning' : 'badge-success'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.totalAmount.toFixed(2)}৳</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCashouts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No records found for selected period.</p>
        )}
      </div>
    </div>
  );
};

export default EarningDetails;
