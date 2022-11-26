import React from 'react';

const Advertise = ({advertise}) => {

    const {image,Original_Price,Resell_Price,name, sellerEmail} = advertise;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>The original price is${Original_Price} and now you can buy it at {Resell_Price}</p>
            <p>Contact us: {sellerEmail}</p>
            </div>
            <figure><img src={image} alt="Shoes" /></figure>
        </div>
    );
};

export default Advertise;