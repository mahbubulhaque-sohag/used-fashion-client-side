import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {

    const [categories, setcategories] = useState([]);
    
    useEffect(()=>{
        axios('http://localhost:5000/categories')
        .then(res=>{
            // console.log(res.data);
            setcategories(res.data)
        })
    },[])

    return (
        <div className='mx-6'>
            <Banner/>
           <div className='mt-10'>
            <h3 className='text-4xl text-pink-600 py-5 text-center font-semibold'>Our all categories</h3>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
           {
                categories.map(category => <Categories 
                key={category._id}
                category={category}
                ></Categories>)
            }
           </div>
           </div>
            <Advertise/>
        </div>
    );
};

export default Home;