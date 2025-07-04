import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import TrustedLogo from './TrustedLogo';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Header = () => {

    const { logout, user } = use(AuthContext)

    const handleLogOut = () => {
        logout()
            .then(() => {
                Swal.fire('logged out successful')
            }).catch(err => {
               toast.error(err.message)
            })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/sendparcel'>Add Parcel</NavLink></li>
        <li><NavLink to='/berider'>Be A Rider</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm mb-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <button className="btn btn-ghost text-xl">
                    <TrustedLogo></TrustedLogo>
                </button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <Link className='mr-4' to='/dashboard'>Dashboard</Link>
                        <button onClick={handleLogOut}>Logout</button>
                        {/* <img src={user?.photoURL} alt="" /> */}
                    </>
                        :
                        (<Link to='/login'>Login</Link>)
                }

            </div>
        </div>
    );
};

export default Header;