import React from 'react';
import UseAuth from '../Context/Hook/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loadeer/Loader';


const PrivateRoute = ({children}) => {

    const {user, loading} = UseAuth()
    const location = useLocation()
    // console.log(location);
    if(loading){
        return  <Loader></Loader>
    }

    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
  
    return children
};

export default PrivateRoute;