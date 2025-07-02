import React from 'react';
import location from './../assets/location-merchant.png'


const MarchantCard = () => {
    return (
        <div data-aos="flip-up" className="bg-no-repeat bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] rounded-4xl p-8 max-w-11/12  mx-auto min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn bg-[#CAEB66] rounded-full">Become a Merchant</button>
                    <button className="btn ms-5 btn-outline text-[#CAEB66] border-[#CAEB66] rounded-full">Become a Merchant</button>
                </div>
            </div>
        </div>
    );
};

export default MarchantCard;