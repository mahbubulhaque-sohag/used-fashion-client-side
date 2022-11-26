import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { authContext } from '../../context/AuthProvider';
import { stateContext } from '../../context/StateProvider';

const MyProducts = () => {
    const {user} = useContext(authContext);
    // const [disable, setDisable] = React.useState(false);

    const {email} = user;

    const {advertisement, setAdvertisement} = useContext(stateContext)
    

    const { isLoading, error, data:products } = useQuery({
        queryKey: ['products/email', user.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproducts/${email}`);
            const data = await res.json();
            return data
        }
      })
    console.log(advertisement)
      if (isLoading) return <progress className="progress w-56"></progress>
    
      if (error) return 'An error has occurred: ' + error.message

      const handleSetAdvertise = product =>{
        console.log(product)
       
        // const newAdvertise = [...advertisement, product]
        // setAdvertisement(newAdvertise)
        fetch('http://localhost:5000/advertisment',{
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(result=>{
            console.log(result)
            // setDisable(true)
          })
      }
    
    return (
        <div className="overflow-x-auto w-full">
        <table className="table w-full">
         
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
         
                 <tbody>
           {
            products.map(product =><tr  key={product._id} product={product} setAdvertisement={setAdvertisement}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                     
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={product.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                            <div className="text-sm opacity-50">${product.Resell_Price}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br/>
                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                      </td>
                      <td>Purple</td>
                      <th>
                       
                        <button onClick={()=>handleSetAdvertise(product)} className="btn btn-ghost btn-xs" >Make Advertise</button>
                      </th>
                    </tr>)
}
                  </tbody>
              
        
        </table>
      </div>
    );
};

export default MyProducts;