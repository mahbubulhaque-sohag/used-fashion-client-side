import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ category }) => {
  const { categoryName, description, img, _id } = category;

  return (
    <div className="card w-96 h-[250px] shadow-xl image-full">
      <figure><img className='w-full' src={img} alt="categoryImage" /></figure>
      <div className="card-body">
        <h2 className="card-title">{categoryName}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/products/${_id}`}
            state={{ from: { category } }}
          > <button className="btn btn-outline btn-secondary"><span className='text-bold'>All Products</span></button></Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;