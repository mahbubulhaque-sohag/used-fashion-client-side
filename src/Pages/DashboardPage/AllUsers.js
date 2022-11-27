import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {

    const {data : users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    })

    console.log(users)
    return (
        <div className="overflow-x-auto">
  <table className="table w-full">
     <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>User Type</th>
        <th></th>
      </tr>
    </thead>
    <tbody>  
        {
            users.map((user, i)=>  <tr key={user._id} user={user}>
                <th>{i+1}</th>
                <td>{user.name}</td>
                <td>{user.account}</td>
                <td><button className="btn btn-ghost btn-xs" >Verify User</button></td>
              </tr>)
        }
     
    </tbody>
  </table>
</div>
    );
};

export default AllUsers;