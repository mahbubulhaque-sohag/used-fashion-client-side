import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
  <input id="mh-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet/>
    
  </div> 
  <div className="drawer-side">
    <label htmlFor="mh-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content"> 
      <li><Link>Sidebar Item 1</Link></li>
      <li><Link>Sidebar Item 2</Link></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;