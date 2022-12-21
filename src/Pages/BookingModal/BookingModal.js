import { jsonEval } from '@firebase/util';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../context/AuthProvider';

const BookingModal = ({product,setItem }) => {
    console.log(product)
    const { Original_Price, Resell_Price, category, description, image, location, name, sellerEmail, sellerName, years_of_purchase, _id, postDate } = product;
    
    const {user} = useContext(authContext);
    console.log('product',product)

    const handleBooked = (event, product, id) =>{
        event.preventDefault();
        const booking = {
            bookingName : event.target.name.value,
            price : event.target.resellPrice.value,
            orderer: event.target.orderer.value,
            email: event.target.email.value,
            location: event.target.location.value,
            phone: event.target.phone.value
        }
        fetch('https://mh-fashion-server-side.vercel.app/bookings',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            toast.success(`This product is booked`)
            setItem(null)
        })
        console.log(booking)
      
    }

    return (
        <div>
            <input type="checkbox" id="product-booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form  onSubmit={handleBooked}>
                    <label htmlFor="product-booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Want to booked {name}?</h3>
                    <p>Product: <input type="text" name='name' defaultValue={name} readOnly className="input input-bordered w-full max-w-xs" /></p>
                    <p>Price: <input type="text" name='resellPrice' defaultValue={Resell_Price} readOnly  className="input input-bordered w-full max-w-xs" /></p>
                    <p>Buyer Name: <input type="text" name='orderer' defaultValue={user?.displayName} readOnly  className="input input-bordered w-full max-w-xs" /></p>
                    <p>Buyer's Email: <input type="email" name='email' defaultValue={user?.email}  className="input input-bordered w-full max-w-xs" /></p>
                    <p>Price: <input type="text" defaultValue={Resell_Price} readOnly  className="input input-bordered w-full max-w-xs" /></p>
                    <p>Contact No: <input type="text" placeholder='type your phone number' name='phone' required  className="input input-bordered w-full max-w-xs" /></p>
                    <p>Location: <input type="text" placeholder='type meeting location' name='location' required  className="input input-bordered w-full max-w-xs" /></p>
                    <input type='submit' className="btn btn-secondary" value='submit'/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;