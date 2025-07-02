import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';



const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const UseAxiosSecure = () => {
    const { user , logout} = UseAuth()
    const navigate = useNavigate()
    // console.log(user?.accessToken);
    useEffect(() => {
        if (user) {
            axiosSecure.interceptors.request.use((config) => {
                //   console.log(user?.accessToken);
                config.headers.Authorization = `Bearer ${user?.accessToken}`
                return config
            }, error => {
                return Promise.reject(error)
            })
        }
    }, [user])

    axiosSecure.interceptors.response.use((res) => {
        return res
    }, error =>{
        // console.log('inside response interseptors',error.status);
        const status = error.status
        if(status === 403){
            navigate('/forbidden')
        }else if(status === 401){
             logout()
             .then(()=>{
                navigate('/login')
             })
             .catch(()=> {})
        }
        return Promise.reject(error)
    })

    return axiosSecure
};


export default UseAxiosSecure;