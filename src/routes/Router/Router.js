import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../layout/Dashboard/Dashboard';
import Main from '../../layout/Main/Main';
import Blog from '../../Pages/Blog/Blog';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';

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
                path: '/dashboard',
               element: <Dashboard/>           
            },
        ]
    }
])