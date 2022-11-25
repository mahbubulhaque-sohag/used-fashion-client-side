import React from 'react';

const ProductCard = ({ product }) => {

    const { Original_Price, Resell_Price, category, description, image, location, name, sellerEmail, sellerName, years_of_purchase, _id, postDate } = product;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="products" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h3>Original Price: ${Original_Price}</h3>
                <h3>Current Price: ${Resell_Price}</h3>
                <h3>Year of purchase: {years_of_purchase}</h3>
                <h3>location: {location}</h3>
                <h3>Seller: {sellerName}</h3>
                <h3>Email: {sellerEmail}</h3>
                <p>{description}</p>
                <div className="card-actions">
                    <label htmlFor="product-booking-modal" className="btn btn-secondary">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;