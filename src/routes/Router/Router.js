import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../layout/Dashboard/Dashboard';
import Main from '../../layout/Main/Main';
import Blog from '../../Pages/Blog/Blog';
import AddProducts from '../../Pages/DashboardPage/AddProducts';
import AllSellers from '../../Pages/DashboardPage/AllSellers';
import AllUsers from '../../Pages/DashboardPage/AllUsers';
import DashboardPage from '../../Pages/DashboardPage/DashboardPage';
import MyProducts from '../../Pages/DashboardPage/MyProducts';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import Products from '../../Pages/Products/Products';
import Register from '../../Pages/Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellerRoute from '../SellerRoute/SellerRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/blog',
                element: <Blog/>
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><Products/></PrivateRoute>
            },
            {
                path: '/dashboard',
               element: <PrivateRoute><Dashboard/></PrivateRoute>,
               children: [
                {
                    path: '/dashboard',
                    element: <DashboardPage/>
                },
                {
                    path: '/dashboard/addProducts',
                    element: <AddProducts/>
                },
                {
                    path: '/dashboard/myProducts',
                    element: <MyProducts/>
                },
                {
                    path: '/dashboard/users',
                    element: <AllUsers/>
                },
                {
                    path: '/dashboard/sellers',
                    element: <AllSellers/>
                },
               ]         
            },
        ]
    }
])