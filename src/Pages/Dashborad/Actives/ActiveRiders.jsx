import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { FaUserSlash } from 'react-icons/fa';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';
import Loader from '../../../Components/Loadeer/Loader';

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure()
 
  //  Fetch active riders
  const { data: riders = [], isLoading , refetch} = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/approved');
      return res.data;
    },
  });


  //  Handle Deactivate
  const handleDeactivate = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Rider will be marked as inactive.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate!',
    }).then(async(result) => {
      if (result.isConfirmed) {
         await axiosSecure.patch(`/riders/${id}`,{
            status: "deactivate"
         })
         refetch()
         Swal.fire('Updated!', 'Rider has been deactivated.', 'success');
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {riders.length === 0 ? (
        <p className="text-gray-600">No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>
                    <span className="badge badge-success text-white capitalize">
                      {rider.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-sm btn-warning text-white"
                    >
                      <FaUserSlash className="inline mr-1" /> Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
