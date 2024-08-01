import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeNav from './wrappers/HomeNav'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Details from './components/Details'
import AdminDashboard from './components/AdminDashboard'
import Checkout from './components/Checkout'
import ToastManager from './components/ToastManager'


const router = createBrowserRouter([

  {
    path: "/",
    element: <HomeNav />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
      { 
        path: "/AdminDashboard/*",
        element:<AdminDashboard/>
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/details/:id",
        element: <Details />
      
      }
    ]
  },

]);
const App = () => {
  return (
    <>
     
    <RouterProvider router={router} />
    <ToastManager /> 
    
    </>
  )
}

export default App
