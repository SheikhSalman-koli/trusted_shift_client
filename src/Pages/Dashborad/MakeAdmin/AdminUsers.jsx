import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserMinus } from 'react-icons/fa';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';


const AdminUsers = () => {
  const axiosSecure = UseAxiosSecure();
//   const queryClient = useQueryClient();

  // search state + debounce (300 ms)
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  // fetch users matching search
  const { data: users = [], isFetching , refetch} = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const res = await axiosSecure.get(`/users?search=${debouncedSearch}`);
      return res.data;
    },
    enabled: !!debouncedSearch, // run only if not empty
  });

  // mutation for role toggle
  const toggleRole = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/role/${id}`, { role }),
    onSuccess: () =>{refetch()},
  });

  const handleToggle = (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const msg = newRole === 'admin' ? 'Make this user an admin?' : 'Remove admin role?';

    Swal.fire({
      title: msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((r) => {
      if (r.isConfirmed) {
        toggleRole.mutate({ id: user._id, role: newRole });
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* search box */}
      <input
        type="text"
        placeholder="Search users by name or email…"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isFetching ? (
        <p className="text-center py-6">Loading…</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={
                        u.role === 'admin'
                          ? 'badge badge-success'
                          : 'badge badge-neutral'
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleToggle(u)}
                      className={
                        u.role === 'admin'
                          ? 'btn btn-sm btn-warning'
                          : 'btn btn-sm btn-success'
                      }
                    >
                      {u.role === 'admin' ? (
                        <>
                          <FaUserMinus className="mr-1" /> Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" /> Make Admin
                        </>
                      )}
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

export default AdminUsers;
