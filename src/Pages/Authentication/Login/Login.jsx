import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEyeSlash } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import SocialLogin from '../SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../../Context/Hook/UseAuth';
import toast from 'react-hot-toast';


const Login = () => {

    const {signInUser, loading} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state || '/'
    // console.log(location,from);

    const { 
        register,
         handleSubmit,
         formState:{errors}
        } = useForm()

    const [showPAssword, setShowPassword] = useState(false)

    const onSubmit = data => {
        const email = data.email
        const password = data.password

        signInUser(email, password)
        .then(result=>{
            // console.log(result.user);
            if(result.user){
                toast.success('user logged in successfully!')
            }
            navigate(from)
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPAssword)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
             <h1 className="text-3xl font-bold">Login Now!</h1>

                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="input"
                        placeholder="Email" 
                        />

                    <label className="label">Password</label>
                    <input
                        type={showPAssword ? "text" : "password"}
                        {...register('password', {required: true, minLength: 6})}
                        className="input text-2xl"
                        placeholder="Password" 
                        />
                        {
                            errors.password?.type === 'required' && 
                            <p
                            className='text-red-500'
                            >you have to set a password</p>
                        }
                        {
                            errors.password?.type === 'minLength' && 
                            <p
                            className='text-red-500'
                            >
                            password must have 6 charectes</p>
                        }

                    <span onClick={handleShowPassword} className=''>
                        {showPAssword ? <FaEyeSlash size={20} /> : <MdRemoveRedEye size={20} />}
                    </span>


                    <button type='submit' className="btn btn-primary text-black mt-4">
                        {loading ? <span className="loading loading-spinner text-neutral"></span> : "Login"}
                        
                        </button>
                <p>New in this site? 
                    <Link className='btn btn-link' to='/register'>Create Account</Link>
                </p>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;