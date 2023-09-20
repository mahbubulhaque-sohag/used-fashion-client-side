import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login, googleLogin } = useContext(authContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data)
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email)
                toast.success('login successfully')
            })
            .catch(err => {
                console.error(err)
                setLoginError(err)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user.displayName)
                const googleUser = { account: 'buyer', name: user.displayName, email: user.email }
                saveUserToDB(googleUser.displayName, googleUser.email, googleUser.account)
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err)
            })
    }

    const saveUserToDB = (name, email, account) => {
        const user = { name, email, account };
        console.log(user)
        fetch('https://mh-fashion-server-side.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center font-bold' >
            <div className='w-auto'>
                <h3 className='text-4xl'>Login Now</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email"  {...register("email", { required: 'Email is required' })} placeholder="Type your email" className="input input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"  {...register("password", { required: 'Password should be at least 6 characters', minLength: { value: 6, message: 'Password must be 6 characters or longer' } })} placeholder="Type a strong password" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <input className='btn btn-sm btn-primary mt-6 w-full' value='Login' type="submit" />
                </form>
                <p className='mt-1'>New to this site? <Link className='text-blue-600/100' to='/register'>Register</Link></p>
                {/* <p className='text-center'>or</p>
                <button onClick={handleGoogleLogin} className='btn btn-sm btn-primary mt-1 w-full'>Sign in with Google</button> */}
                {/* show errors */}
                {errors.password && <p className="text-red-400">{errors.password?.message}</p>}
                <input className='btn btn-sm btn-primary mt-6 w-full' value='Register' type="submit" />
                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                {loginError && <p className='text-red-600'>{loginError.message}</p>}
            </div>
        </div>
    );
};

export default Login;