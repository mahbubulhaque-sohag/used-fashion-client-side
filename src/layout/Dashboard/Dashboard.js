import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';

const Dashboard = () => {

  const { user } = useContext(authContext);
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)
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
          <li><Link to='/dashboard/myBookings'>My Bookings</Link></li>
            {isSeller && <>
              <li><Link to='/dashboard/addProducts'>Add Products</Link></li>
              <li><Link to='/dashboard/myProducts'>My Products</Link></li>
            </>
            }
            {
              isAdmin && <>
                <li><Link to='/dashboard/users'>All Users</Link></li>
                <li><Link to='/dashboard/sellers'>All Sellers</Link></li>
              </>
            }

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;