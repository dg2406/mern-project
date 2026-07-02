import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Layout from "../components/layout";
import axios from "axios";
import { useOrders } from "../context/order";

import {
  FaBoxOpen,
  FaTags,
  FaPlusCircle,
  FaShoppingBag,
} from "react-icons/fa";

const AdminDashboard = () => {

  const [productsCount, setProductsCount] =
    useState(0);

  const [categoriesCount, setCategoriesCount] =
    useState(0);

  const [orders] = useOrders();

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {

      const productRes =
        await axios.get(
          "/api/v1/product/get-product"
        );

      const categoryRes =
        await axios.get(
          "/api/v1/category/get-category"
        );

      setProductsCount(
        productRes.data.products.length
      );

      setCategoriesCount(
        categoryRes.data.category.length
      );

    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container py-5">

        {/* Top Banner */}
        <div className="card border-0 shadow-lg rounded-4 mb-4 overflow-hidden">

          <div
            className="p-4 text-white"
            style={{
              background:
                "linear-gradient(135deg,#141E30,#243B55)"
            }}
          >
            <h2 className="fw-bold">
              Admin Dashboard ⚡
            </h2>

            <p className="mb-0">
              Manage products, categories and store activity
            </p>

          </div>

        </div>

        <div className="row g-4">

          {/* Sidebar */}
          <div className="col-lg-3">

            <div className="card border-0 shadow rounded-4">

              <div className="card-body text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                  alt="admin"
                  width="90"
                  className="rounded-circle mb-3"
                />

                <h5 className="fw-bold">
                  Admin Panel
                </h5>

                <p className="text-muted small">
                  Control Center
                </p>

              </div>

              <div className="list-group list-group-flush">

                <NavLink
                  to="create-category"
                  className={({isActive}) =>
                    `list-group-item border-0 py-3 ${
                      isActive
                        ? "bg-primary text-white"
                        : ""
                    }`
                  }
                >
                  <FaTags className="me-2"/>
                  Create Category
                </NavLink>

                <NavLink
                  to="create-product"
                  className={({isActive}) =>
                    `list-group-item border-0 py-3 ${
                      isActive
                        ? "bg-primary text-white"
                        : ""
                    }`
                  }
                >
                  <FaPlusCircle className="me-2"/>
                  Create Product
                </NavLink>

                <NavLink
                  to="products"
                  className={({isActive}) =>
                    `list-group-item border-0 py-3 ${
                      isActive
                        ? "bg-primary text-white"
                        : ""
                    }`
                  }
                >
                  <FaBoxOpen className="me-2"/>
                  Products
                </NavLink>

              </div>

            </div>

          </div>

          {/* Main Content */}
          <div className="col-lg-9">

            {/* Stats */}

            <div className="row g-3 mb-4">

              <div className="col-md-4">

                <div className="card border-0 shadow rounded-4 p-3">

                  <FaBoxOpen size={25}/>

                  <h5 className="mt-2">
                    Products
                  </h5>

                  <h3>
                    {productsCount}
                  </h3>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow rounded-4 p-3">

                  <FaTags size={25}/>

                  <h5 className="mt-2">
                    Categories
                  </h5>

                  <h3>
                    {categoriesCount}
                  </h3>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow rounded-4 p-3">

                  <FaShoppingBag size={25}/>

                  <h5 className="mt-2">
                    Orders
                  </h5>

                  <h3>
                    {orders?.length || 0}
                  </h3>

                </div>

              </div>

            </div>

            {/* Dynamic Outlet */}

            <div
              className="card border-0 shadow rounded-4 p-4"
              style={{
                minHeight:"500px"
              }}
            >
              <Outlet/>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default AdminDashboard;