import React from 'react';
import useUserRole from '../../../Context/Hook/useUserRole';
import Loader from '../../../Components/Loadeer/Loader';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';

const DashBoardHome = () => {
    
    const {role, roleLoading} = useUserRole()
    // console.log(role, roleLoading);

    if(roleLoading){
        return <Loader></Loader>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    } else if( role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    } else if( role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }

};

export default DashBoardHome;