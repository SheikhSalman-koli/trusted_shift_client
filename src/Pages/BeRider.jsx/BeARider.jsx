import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Context/Hook/UseAuth";
import agent from '../../assets/agent-pending.png'
import UseAxiosSecure from "../../Context/Hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";

const regionDistrictMap = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
    Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati"],
    Rajshahi: ["Rajshahi", "Natore", "Pabna"],
    Khulna: ["Khulna", "Bagerhat", "Satkhira"],
};

const BeARider = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
        },
    });

    const locationData = useLoaderData()

    const selectedRegion = watch("region");

    // get unique regions
    const uniqueRegions = [...new Set(locationData.map((loc) => loc.region))];

    // get districts of selected region
    const filteredDistricts = locationData
        .filter((loc) => loc.region === selectedRegion)
        .map((loc) => loc.district);

    const onSubmit = (data) => {

        const riderData = {
            ...data,
            status: 'pending',
            work_status: '',
            create_At: new Date().toISOString()
        }

        axiosSecure.post('/riders', riderData)
        .then(res=>{
            if (res.data.insertedId) {
            Swal.fire('rider created successfully!')
        }
        }).catch(error=>{
            toast.error(error.message)
        })
        
       
        // reset();
    };

    return (
        <section className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Heading & tagline */}
            <header className="text-center space-y-3">
                <h1 className="text-3xl font-bold">Be a Rider</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real‑time tracking and zero
                    hassle. From personal packages to business shipments — we deliver on
                    time, every time.
                </p>
            </header>

            {/* Form + image */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-base-100 p-6 rounded shadow space-y-6"
                >
                    <h2 className="text-xl font-semibold mb-2">Tell us about yourself</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Name (read‑only) */}
                        <div>
                            <label className="label">Your Name</label>
                            <input
                                className="input input-bordered w-full"
                                readOnly
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">Name is required</p>
                            )}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="label">Age</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("age", { required: true, min: 18 })}
                            />
                            {errors.age && (
                                <p className="text-red-500 text-sm">
                                    Valid age required (18+)
                                </p>
                            )}
                        </div>

                        {/* Email (read‑only) */}
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                readOnly
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">Email is required</p>
                            )}
                        </div>

                        {/* Region */}
                        <div>
                            <label className="label">Region</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("region", { required: true })}
                            >
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {errors.region && <p className="text-red-500">Region is required</p>}
                        </div>

                        {/* NID */}
                        <div>
                            <label className="label">NID No</label>
                            <input
                                className="input input-bordered w-full"
                                {...register("nid", { required: true })}
                            />
                            {errors.nid && (
                                <p className="text-red-500 text-sm">NID is required</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="label">Contact No</label>
                            <input
                                className="input input-bordered w-full"
                                {...register("contact", { required: true })}
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-sm">Contact is required</p>
                            )}
                        </div>

                        {/* District full width */}
                        <div className="md:col-span-2">
                            <label className="label">District</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("district", { required: true })}
                                disabled={!selectedRegion}
                            >
                                <option value="">Select District</option>
                                {filteredDistricts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                            {errors.district && <p className="text-red-500">District is required</p>}
                        </div>
                    </div>

                    <button className="btn btn-primary text-black w-full mt-4">
                        Become a Rider
                    </button>
                </form>

                {/* image */}
                <div className="flex items-center justify-center">
                    <img
                        src={agent}
                        alt="Rider"
                        className="rounded-lg w-full h-auto object-cover shadow"
                    />
                </div>
            </div>
        </section>
    );
};

export default BeARider;
