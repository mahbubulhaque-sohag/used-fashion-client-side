import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';

const MyBookings = () => {
    const {user} = useContext(authContext);
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/bookings/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setBookings(data)
        })
    } ,[user?.email])
    return (
        <div className="overflow-x-auto">
            <h1 className='text-4xl py-3'>My Bookings</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
          {
            bookings.map((booking, i) =>  <tr key={booking._id}>
            <th>{i+1}</th>
            <td>{booking.bookingName}</td>
            <td>$ {booking.price}</td>
            <td>
              {
              booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button  className="btn btn-secondary btn-xs" >Pay</button></Link>
              }
              {
                booking.price && booking.paid && <span className='text-primary'>Paid</span>
              }
              </td>
          </tr>
          )
          } </tbody>
        </table>
      </div>
    );
};

export default MyBookings;