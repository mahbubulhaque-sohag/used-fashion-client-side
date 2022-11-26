import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
    const location = useLocation()
  const { from } = location.state;
  const category = from.category;

  const [products, setProducts] = useState([]);
  const [item, setItem] = useState(null);

    useEffect( ()=>{
      fetch(`http://localhost:5000/products/${category.categoryName}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setProducts(data)
      })
    },[category])

    return (
        <div className='my-10'>
            <h3 className='text-pink-500 text-4xl font-bold text-center mb-10 pb-5'>This are all products of {category.categoryName}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    setItem={setItem}></ProductCard>)
                }
            </div>
            {
              item && products.map(product=><BookingModal 
              key={product._id}
              product={product}
              setProducts={setProducts}
              setItem={setItem}
              ></BookingModal>)
            }
            
        </div>
    );
};

export default Products;