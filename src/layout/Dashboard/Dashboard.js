import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="mh-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="mh-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li><Link to='/dashboard/addProducts'>Add Products</Link></li>
            <li><Link to='/dashboard/myProducts'>My Products</Link></li>
            <li><Link to='/dashboard/users'>All Users</Link></li>
            <li><Link to='/dashboard/sellers'>All Sellers</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;