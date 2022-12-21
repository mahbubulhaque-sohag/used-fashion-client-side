import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../../../context/StateProvider';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {

    const [categories, setcategories] = useState([]);
    const { advertisement } = useContext(stateContext);
    console.log(advertisement)

    useEffect(() => {
        axios('https://mh-fashion-server-side.vercel.app/categories')
            .then(res => {
                // console.log(res.data);
                setcategories(res.data)
            
            })
    }, [])
 


    const { isLoading, error, data:advertisements } = useQuery({
        queryKey: ['advertisement',],
        queryFn: async () => {
            const res = await fetch(`https://mh-fashion-server-side.vercel.app/advertisement`);
            const data = await res.json();
            return data
        }
      })
    console.log(advertisements)
      if (isLoading) return <progress className="progress w-56"></progress>
    
      if (error) return 'An error has occurred: ' + error.message



    return (
        <div className='mx-6'>
            <Banner />
            <div className='mt-10'>
                <h3 className='text-4xl text-pink-600 py-5 text-center font-semibold'>Our all categories</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        categories.map(category => <Categories
                            key={category._id}
                            category={category}
                        ></Categories>)
                    }
                </div>
            </div>
            <div className='my-10'>
                <h2 className='text-4xl text-pink-600 py-5 text-center font-semibold'>Advertise</h2>
                {
                    advertisements && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        advertisements.map(advertise => <Advertise
                            key={advertise._id}
                            advertise={advertise}></Advertise>)
                    }
                </div>
                }
            </div>
        </div>
    );
};

export default Home;