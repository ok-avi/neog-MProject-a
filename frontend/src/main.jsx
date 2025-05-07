import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Login from './pages/Login.jsx'
import Product from './pages/Product.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />
  },
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/wishlist",
    element:<Wishlist/>,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/products/:productCategory",
    element:<Product/>
  },
  {
    path:"/product/:productId",
    element:<ProductDetails />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
