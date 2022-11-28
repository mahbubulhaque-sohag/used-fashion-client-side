import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';
import useVerifiedSeller from '../../hooks/useVerifiedSeller';

const AddProducts = () => {
    const { register, handleSubmit, data } = useForm();
    const {user} = useContext(authContext);

    const [isVerifiedSeller] = useVerifiedSeller(user?.email)
    const [verifiedSeller, setVerifiedSeller] = useState({});
    const navigate = useNavigate();

   const state={
        curDT : new Date().toLocaleString(),
      }
      const imageHostKey = process.env.REACT_APP_imagebb_key;


    const handleAddProducts = data =>{
        // console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url =`https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const product = {
                    Original_Price : data.Original_Price,
                    Resell_Price: data.Resell_Price,
                    category: data.category,
                    description: data.description,
                    image: imgData.data.url,
                    location: data.location,
                    name: data.name,
                    postDate: data.postDate,
                    sellerEmail: data.sellerEmail,
                    sellerName: data.sellerName,
                    verifiedSymbol: data.status,
                    years_of_purchase: data.years_of_purchase }
                    console.log(product)

                    // save product information to the database
                    fetch('http://localhost:5000/products',{
                        method: 'POST',
                        headers: {
                            'content-type' : 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                    .then(res=> res.json())
                    .then(result=>{
                        console.log(result)
                        toast.success('Product added successfully')
                        navigate('/dashboard/myProducts')
                    })
            }
        })
    }

    useEffect( ()=>{
        fetch(`http://localhost:5000/users/verifySeller/${user?.email}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            setVerifiedSeller(data.user)
        })
    } ,[user?.email])

    return (
        <form className='my-10' onSubmit={handleSubmit(handleAddProducts)}>
                 <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Product Name</span></label>
                    <input type="text"  {...register("name")}  className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
       
                    <label className="label"><span className="label-text">Location</span></label>
                    <input type="text"  {...register("location")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Original Price</span></label>
                    <input type="text"  {...register("Original_Price")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Resell Price</span></label>
                    <input type="text"  {...register("Resell_Price")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Years of purchase</span></label>
                    <input type="text"  {...register("years_of_purchase")}  className="input input-bordered w-full max-w-xs" />
                </div>
                
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Description</span></label>
                    <input type="text"  {...register("description")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Seller</span></label>
                    {
                        isVerifiedSeller ?  
                        <>
                        <input type="text" defaultValue={user?.displayName} readOnly  {...register("sellerName")}  className="input input-bordered w-full max-w-xs" />
                        <input type="text" defaultValue={verifiedSeller?.symbol} readOnly  {...register("status")}  className="input input-bordered w-full max-w-xs" />
                        </> 
                        :
                      <>
                        <input type="text" defaultValue={user?.displayName} readOnly  {...register("sellerName")}  className="input input-bordered w-full max-w-xs" /> 
                    </>
                    }
                   
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email" defaultValue={user?.email}  readOnly  {...register("sellerEmail")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Image</span></label>
                    <input type="file"  {...register("image")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Post Date</span></label>
                    <input  defaultValue={state.curDT}  {...register("postDate")}  className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <select {...register("category")}>
                        <option value="Men's fashion">Men's fashion</option>
                        <option value="Ladies fashion">Ladies fashion</option>
                        <option value="kid's fashion">kid's fasion</option>
                    </select>
                    </div>

                <p>{data}</p>
                <input className='btn btn-sm btn-primary mt-6 ' value='Add Products' type="submit" />
            </form>
    );
};

export default AddProducts;