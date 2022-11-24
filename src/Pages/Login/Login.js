import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';

const Login = () => {

    const { register, handleSubmit } = useForm();
    const {login, googleLogin} = useContext(authContext);
    const navigte = useNavigate();
   
    const handleLogin = data =>{
        console.log(data)
        login(data.email, data.password)
        .then(result=>{
            const user = result.user;
            console.log(user)
            toast.success('login successfully')
            navigte('/')
        })
        .catch(err=>{
            console.error(err)
        })
    }

    const handleGoogleLogin = () =>{
        googleLogin()
        .then(result=>{
            const user = result.user;
            console.log(user)
        })
        .catch(err=>{
            console.error(err)
        })
    }

    return (
        <div className='h-[800px] flex justify-center items-center font-bold' >
            <div className='w-auto'>
            <h3 className='text-4xl'>Login Now</h3>
            <form onSubmit={handleSubmit(handleLogin)}>
                 <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="email"  {...register("email")} placeholder="Type your email" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input type="password"  {...register("password")} placeholder="Type your password" className="input input-bordered w-full max-w-xs" />
                </div>


                {/* <p>{data}</p> */}
                <input className='btn btn-sm btn-primary mt-6 w-full' value='Login' type="submit" />
            </form>
            <p className='mt-1'>New to this site? <Link className='text-blue-600/100' to='/register'>Register</Link></p>
            <p className='text-center'>or</p>
            <button onClick={handleGoogleLogin} className='btn btn-sm btn-primary mt-1 w-full'>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;