import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllSellers = () => {


    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers')
            const data = await res.json();
            return data;
        }
    })

    if(isLoading)return <progress className="progress w-56"></progress>;

    const handleVerifySeller = id =>{
        fetch(`http://localhost:5000/sellers/verify/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount > 0){
                toast.success('Seller Verified Successfully')
                refetch()
            }
        })
    }

    const handleDeleteSeller = seller =>{
        const agree = window.confirm(`Are you sure to delete: ${seller.name}`);
        if(agree){
            fetch(`http://localhost:5000/sellers/delete/${seller._id}`,{
                method : 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`Successfully deleted ${seller.name}`)
                refetch()
            })
        }
    } 

    console.log(sellers)

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Admin Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, i) => <tr key={seller._id} seller={seller}>
                            <th>{i + 1}</th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{seller.account}</td>
                            <td>{ seller?.status !== 'verified' && <button onClick={()=> handleVerifySeller(seller._id)} className="btn btn-primary btn-xs" >Verify Seller</button>}</td>
                            <td><button onClick={()=> handleDeleteSeller(seller)} className="btn btn-danger btn-xs" >Delete Seller</button></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;