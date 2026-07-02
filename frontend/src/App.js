import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/auth";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NoPageFound from "./pages/NoPageFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Forgot from "./pages/forgot";
import Success from "./components/success";
import Cancel from "./components/cancel";
import PrivateRoute from "./components/private";
import AdminDashboard from "./dashboard/admin";
import UserDashboard from "./dashboard/userboard";
import CreateCategory from "./components/create-category";
import CreateProduct from "./components/create-product";

import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetails from "./components/ProductDetails";
import Users from "./components/allusers";
import Profile from "./components/profile";
import StoreLocator from "./pages/StoreLocator";
import Orders from "./components/orders";
function App() {
  const [auth] = useAuth();

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route
          path="/login"
          element={auth?.user ? <Navigate to="/" /> : <Login />}
        />

        {/* PRIVATE ROUTE */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* USER */}
          <Route
            path="user"
            element={
              auth?.user?.role === "user" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* ADMIN */}
          <Route
            path="admin"
            element={
              auth?.user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="products" element={<Products />} />

            <Route path="update-product/:slug" element={<UpdateProduct />} />

            <Route path="users" element={<Users />} />
          </Route>
        </Route>

        {/* OTHER ROUTES */}
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/success" element={<Success />} />

        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
