import React from 'react';
import UseAuth from '../Context/Hook/UseAuth';
import useUserRole from '../Context/Hook/useUserRole';
import Loader from '../Components/Loadeer/Loader';
import { Navigate } from 'react-router';

const RiderRoute = ({children}) => {

    const {user,  loading} = UseAuth()
    const {role, roleLoading} = useUserRole()

    if(loading || roleLoading){
        return <Loader></Loader>
    }

    if(!user || role !== 'rider'){
        return <Navigate to='/forbidden'></Navigate>
    }

    return children
};

export default RiderRoute;