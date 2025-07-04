import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../../Context/Hook/UseAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../../../Context/Hook/useAxios';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUser, loading} = UseAuth()
    const [profile, setProfile] = useState('')
    const axiosInstance = useAxios()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state || '/'

    const { register,
         handleSubmit,
          formState: { errors } 
        } = useForm()

    const onSubmit = info => {
        const email = info.email
        const password = info.password
        const name = info.name
        const photo = profile

        createUser(email, password)
            .then(async(result) => {
                 navigate(from)
                const emailHolder = result.user

                  const userInfo = {
                    name: name,
                    email: email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_at: new Date().toISOString()
                }

                const userRes =await axiosInstance.post('/users', userInfo)
                console.log(userRes);


                const updatedfile = {
                    ...emailHolder,
                    displayName: name,
                    photoURL: photo
                }

                updateUser(updatedfile)
                .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        })
                       
                    }).catch(error => {
                        toast.error(error.message);
                    })

            }).catch(error => {
                toast.error(error.message);
            })

    }

    const handleUpload =async e =>{
        e.preventDefault()
        const photo = e.target.files[0]
        // console.log(photo);
        const formData = new FormData()
        formData.append('image', photo)
        const res =await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)
        setProfile(res.data.data.display_url);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h1 className="text-3xl font-bold">Create An Account!</h1>

                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true, })}
                        className="input"
                        placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p role='alart' className='text-red-500'>fill the input field</p>
                    }

                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                        className="input"
                        placeholder="Password" />
                    {
                        errors.password?.type === 'pattern' &&
                        <p role='alart' className='text-red-500'>enter correct password</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p role='alart' className='text-red-500'>Length minimum 6 characters</p>
                    }

                    <label className='label'>Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        className='input'
                        placeholder='Name' />

                    <label className='label'>Photo</label>
                    <input
                        onChange={handleUpload}
                        type="file"
                        accept="image/*"
                        className='file-input file-input-bordered'
                        placeholder='drag your photo here' />

                    <button type='submit' className="btn btn-primary text-black mt-4">
                        {loading ? <span className="loading loading-spinner text-neutral"></span> : "Register"}
                        </button>

                    <p>Already have an account?
                        <Link className='btn btn-link' to='/login'>Login</Link>
                    </p>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;