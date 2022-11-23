import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

const Register = () => {

    const { register, handleSubmit } = useForm();
   
    const handleRegister = data =>{
        console.log(data)
    }

    return (
        <div className='h-[800px] flex justify-center items-center font-bold' >
            <div className='w-auto'>
            <h3 className='text-4xl'>Register Now</h3>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text"  {...register("Name")} placeholder="Type your name" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="email"  {...register("email")} placeholder="Type your email" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input type="password"  {...register("password")} placeholder="Type a strong password" className="input input-bordered w-full max-w-xs" />
                </div>


                {/* <p>{data}</p> */}
                <input className='btn btn-sm btn-primary mt-6 w-full' value='Register' type="submit" />
            </form>
            <p className='mt-1'>Already have an account? <Link className='text-blue-600/100' to='/login'>Login</Link></p>
            <p className='text-center'>or</p>
            <button className='btn btn-sm btn-primary mt-1 w-full'>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Register;