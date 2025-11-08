import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ProductsDetails from "./components/products/ProductsDetails";
import ProtectedRouter from "./components/protected/ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index : true,
        element: <Home />,
      },
        
      {
        path: '/register',
        element: <Register />,


      },

      {
        path: '/login',
        element: <Login />,


      },

      {
        path: '/cart',
        element:
        <ProtectedRouter>
          <Cart />
        </ProtectedRouter>,


      },
      {
        path: '/checkout',
        element:
        <ProtectedRouter>
          <Checkout />
        </ProtectedRouter>,


      },
      {
        path:'/product/:id',
        element:
        <ProtectedRouter>
          <ProductsDetails />
        </ProtectedRouter>,
      }
    ],
  },
]);
export default router;