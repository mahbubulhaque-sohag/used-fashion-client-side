import React from 'react';

const Blog = () => {
    return (
        <div className='m-10'>
            <h2 className='text-3xl py-10 text-pink-600'>This is some general questions of people and its details.</h2>
            <div tabIndex={0} className="collapse collapse-arrow border  border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    What services you provide fo user?
                </div>
                <div className="collapse-content">
                    <p>We provide many useful services like-</p>
                    <ul>
                        <li>Fashion Trend Reports</li>
                        <li>Style Guides</li>
                        <li>Personal Styling Services</li>
                        <li>Virtual Try-On</li>
                        <li>Size and Fit Guides</li>
                    </ul>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    How many categories of fashion you provide?
                </div>
                <div className="collapse-content">
                    <p>There are three categories we provide. These are men's fashion, ladies fashion and kid's fashion.</p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    What is your price range?
                </div>
                <div className="collapse-content">
                    <p>Our price range is within the affordability of all types of clients. We set our prices keeping all types of clients in mind.</p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    How reliable is your site?
                </div>
                <div className="collapse-content">
                    <p>
                        Our site carries the highest level of reliability. You may use our site without restriction.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;