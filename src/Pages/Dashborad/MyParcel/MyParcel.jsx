import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Context/Hook/UseAuth';
import ParcelTable from './ParcelTable';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import UseAxiosSecure from '../../../Context/Hook/UseAxiosSecure';


const MyParcel = () => {

    const { user } = UseAuth()
    const navigate = useNavigate()
    const axiosSecure = UseAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user?.email}`)
            return res.data
        }
    })

    // console.log(parcels);

    const handlePayment = (id) => {
        // console.log(id);
        navigate(`/dashboard/payment/${id}`)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This parcel will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your parcel has been successfully deleted.',
                                icon: 'success',
                                confirmButtonColor: '#16a34a',
                            });
                        }
                        refetch()
                    }).catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the parcel.',
                            icon: 'error',
                            confirmButtonColor: '#d33',
                        });
                    });
            }
        });
    };


    return (
        <div>
            <ParcelTable
                parcels={parcels}
                onView={(parcel) => console.log('View', parcel)}
                onPay={handlePayment}
                onDelete={handleDelete}
            />

        </div>
    );
};

export default MyParcel;