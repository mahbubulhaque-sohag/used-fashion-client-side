import React from 'react';
import image from '../../../assets/banner/banner.jpg';

const Banner = () => {
    return (
        <div className="hero lg:h-screen" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello costume lovers...</h1>
                    <p className="mb-5">A huge collection of used and fashionable clothes. We are unique for attractive price to buy clothes.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;