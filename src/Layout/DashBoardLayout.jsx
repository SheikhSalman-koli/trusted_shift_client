import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { MdAttachMoney, MdDoneAll, MdPendingActions, MdTrackChanges } from 'react-icons/md';
import { FaMotorcycle, FaUserEdit, FaUserPlus, FaUserShield } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';
import TrustedLogo from '../Components/TrustedLogo';
import './Dashboard.css'
import useUserRole from '../Context/Hook/useUserRole';

const DashBoardLayout = () => {

    const { role, roleLoading } = useUserRole()
    // console.log(role, roleLoading);

    return (

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-nonex">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>


            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <TrustedLogo></TrustedLogo>
                    <li>
                        <NavLink to="/dashboard">
                            <AiFillHome className="inline mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myparcel">
                            <FiPackage className="inline mr-2" /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/history">
                            <BsClockHistory className="inline mr-2" /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track">
                            <MdTrackChanges className="inline mr-2" /> Track
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="inline mr-2" /> Update Profile
                        </NavLink>
                    </li>

                    {/* for rider */}
                    {!roleLoading && role === 'rider' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/pending-delivery">
                                    <MdPendingActions className="inline mr-2" /> Pending Delivery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/completed-parcels">
                                    <MdDoneAll className="inline mr-2" /> Completed Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/earning-details">
                                    <MdAttachMoney className="inline mr-2" /> Earning Details
                                </NavLink>
                            </li>
                        </>
                    }

                    {/* for admin */}
                    {
                        !roleLoading && role === 'admin' && <>
                            <li>
                                <NavLink to="/dashboard/assignrider">
                                    <FaUserPlus className="inline mr-2" /> Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pendingrider">
                                    <MdPendingActions className="inline mr-2" /> Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/activerider">
                                    <FaMotorcycle className="inline mr-2" /> Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminusers">
                                    <FaUserShield className="inline mr-2" /> Admin Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allow-withdraw">
                                    <MdAttachMoney className="inline mr-2" /> Allow Withdraw
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>

        </div>
    );
};

export default DashBoardLayout;