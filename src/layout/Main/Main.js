import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../routes/Router/shared/Footer/Footer';
import Navbar from '../../routes/Router/shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;