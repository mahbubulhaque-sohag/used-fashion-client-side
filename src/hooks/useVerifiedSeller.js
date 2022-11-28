import { useEffect, useState } from "react"

const useVerifiedSeller = email =>{
    const [isVerifiedSeller, setIsVerifiedSeller] = useState(false);
    const [isVerifiedSellerLoading, setIsVerifiedSellerLoading] = useState(true);

    useEffect( ()=>{
        if(email){
            fetch(`http://localhost:5000/users/verifySeller/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsVerifiedSeller(data.isVerifiedSeller)
                setIsVerifiedSellerLoading(false)
            })
        }
    } ,[email])
    return [isVerifiedSeller, isVerifiedSellerLoading]
}

export default useVerifiedSeller;