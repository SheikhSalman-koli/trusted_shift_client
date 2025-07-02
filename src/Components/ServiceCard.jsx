// components/ServiceCard.jsx
import React from 'react';


export default function ServiceCard({ service }) {

    const {icon, title, description} = service
  return (
    <div data-aos="zoom-in" className="text-center bg-base-100 p-6 rounded-2xl hover:bg-[#CAEB66] transition-colors duration-300">
      <div className="mb-4  text-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-sm text-black">{description}</p>
    </div>
  );
}
