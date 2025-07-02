import React from 'react';
import { Outlet } from 'react-router';
import TrustedLogo from '../Components/TrustedLogo';
import authimage from '../assets/authImage.png'

const AuthLayOut = () => {
    return (
        <div className=" bg-base-200 p-16">
            <TrustedLogo></TrustedLogo>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1 bg-[#FAFDF0]'>
                     <img
                    src={authimage}
                    className="max-w-sm rounded-lg"
                />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayOut;