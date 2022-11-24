import React from 'react';

const Categories = ({category}) => {
    const {categoryName, description, img, _id} =category;
    console.log(category)

    return (
        <div className="card w-96 h-[250px] shadow-xl image-full">
        <figure><img src={img} alt="categoryImage" /></figure>
        <div className="card-body">
          <h2 className="card-title">{categoryName}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">All Products</button>
          </div>
        </div>
      </div>
    );
};

export default Categories;