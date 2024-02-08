import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedAdmin from "./features/auth/auth-components/ProtectedAdmin";
import ForgotPassword from "./features/auth/auth-components/ForgotPassword";
import { fetchCartProductsByUserIdAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./features/navbar/Navbar";
import UserOrderPage from "./pages/UserOrderPage";
import { fetchUserInfoAsync } from "./features/userInfo/userSlice";
import UserProfilePage from "./pages/UserProfilePage";
import AdminHome from "./pages/AdminHome";
import Logout from "./features/auth/Logout";
import AdminProductForm from "./features/adminPanel/components/AdminProductForm";
import AdminOrders from "./features/adminPanel/components/AdminOrders";
import StripeCheckoutPage from "./pages/StripeCheckoutPage";
import AboutUsPage from "./pages/AboutUsPage";
import { checkAuthAsync } from "./features/auth/authSlice";
import { Helmet } from 'react-helmet';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Home></Home>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>,
  },
  {
    path: "/checkout",
    element: (
    <Checkout></Checkout>
    ),
  },
  {
    path: "/productdetail/:id",
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/orderSuccess/:id",
    element: (
        <Navbar>
          <OrderSuccess></OrderSuccess>
        </Navbar>
    ),
  },
  {
    path: "/usersOrders",
    element: (
        <UserOrderPage></UserOrderPage>
    ),
  },
  {
    path: "/userProfile",
    element: (
    <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path: "/logOut",
    element: <Logout></Logout>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/admin/adminProductForm",
    element: <AdminProductForm></AdminProductForm>
  },
  {
    path: "/admin/adminProductForm/edit/:id",
    element: <AdminProductForm></AdminProductForm>
  },
  {
    path: "/admin/adminOrders",
    element: (
      <ProtectedAdmin>
        <AdminOrders></AdminOrders>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/adminOrders/usersOrders/:id",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/StripeCheckoutPage",
    element: (
    <StripeCheckoutPage></StripeCheckoutPage>
    ),
  },
  {
    path: "/aboutUs",
    element: <AboutUsPage></AboutUsPage>,
  }
]);

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const authUser = useSelector(state => state.auth.loggedInUser);
  const authChecked = useSelector(state => state.auth.checkAuth);
  const authStatus = useSelector(state => state.auth.status);
  const cartItems = useSelector((state) => state.cart.items);
  const StatusQty = useSelector((state) => state.cart.statusQty);
  const cartItemsLength = cartItems ? cartItems.length : 0; 

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch]);
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [authStatus]);
  useEffect(() => {
    if(authUser){
      dispatch(fetchUserInfoAsync());
    }
  }, [dispatch, authUser]);
  
  useEffect(() => {
    if(userInfo){
    dispatch(fetchCartProductsByUserIdAsync(userInfo.id));
    }
  }, [dispatch, cartItemsLength, userInfo, StatusQty]);
    return (
      <div>
        <Helmet>
        <title>Manu saini inzab ecommerse site</title>
        <meta name="description" content="Manu saini inzab ecommerse site. You will get all the garden." />
        <meta property="og:title" content="My Page Title for Social Sharing" />
        <meta property="og:description" content="Manu saini inzab ecommerse site" />
        </Helmet>
        {authChecked && <RouterProvider router={router} />}
      </div>
    )
  }

  // return (
  //   <div>
  //     {(userInfo && cartItemsLength) || (["/login", "/signup"].includes(window.location.pathname) && authUser===undefined) && (
  //       <RouterProvider router={router} />
  //     )}
  //   </div>
  // );
  
  

export default App;