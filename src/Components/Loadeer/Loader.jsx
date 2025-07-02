import React from 'react';
import { RingLoader } from "react-spinners";
// #32ff7e
const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <RingLoader 
            className='text-[#32ff7e]'
            />
        </div>
    );
};

export default Loader;