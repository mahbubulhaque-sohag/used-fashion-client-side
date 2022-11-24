import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from "../../context/AuthProvider";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const {createUser, updateUserProfile, user} = useContext(authContext);
    const navigte = useNavigate();

    const handleRegister = data =>{
        console.log(data);
        createUser(data.email, data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            toast.success('User created successfully');
            handleUpdateProfile(data.name)
            navigte('/');
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const handleUpdateProfile = (name) => {
        const profile = {
          displayName : name
        }
        updateUserProfile(profile)
        .then(()=>{})
        .catch((error)=>console.error(error))
      }

    return (
        <div className='h-[800px] flex justify-center items-center font-bold' >
            <div className='w-auto'>
            <h3 className='text-4xl'>Register Now</h3>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text"  {...register("name")} placeholder="Type your name" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
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
            </div>
        </div>
    );
};

export default Register;