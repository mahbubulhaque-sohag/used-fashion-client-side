import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link} from 'react-router-dom';
import logo from '../../../assets/logo/logo2.png';
import { authContext } from '../../../context/AuthProvider';

const Navbar = () => {

    const { logout, user } = useContext(authContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('logout successfully')
            })
            .catch(err => console.error(err))
    }

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        {
            user?.uid ? <>
                <li><button onClick={handleLogout}>Logout</button></li>
            </> : <>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </>
        } </>
    return (
        <div className="navbar bg-base-100 justify-around">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <div className='flex'>
                    <img className='hidden md:block lg:block' src={logo} alt='website-logo' />
                    <Link to='/' className="btn btn-ghost normal-case  font-bold sm:text-2xl md:text-4xl lg:text-4xl text-pink-600">Mh Fashion</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="mh-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
        </div>
    );
};

export default Navbar;










// [
//     {
//         "categoryName":"Men's fashion",
//         "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJMHpg9001H-MmrsqDTBEHSFpym1X5OaxBg&usqp=CAU",
//         "description":"Short used but like new, branded and latest men's fashion collection"
//     },
//     {
//         "categoryName":"Ladies fashion",
//         "img":"https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/02/40s-women-fashion-d2line-tips.png",
//         "description":"Short used but like new, branded and latest women's fashion collection"
//     },
//     {
//         "categoryName":"kid's fasion",
//         "img":"https://img.freepik.com/free-photo/full-length-portrait-cute-little-kid-girl-stylish-jeans-clothes-smiling-standing-white-kids-fashion-concept_155003-20300.jpg?w=2000",
//         "description":"Short used but like new, branded and latest kid's fashion collection"
//     },
// ]