import { NavLink, Outlet } from "react-router-dom";
import Layout from "../components/layout";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { useOrders } from "../context/order";

const UserDashboard = () => {

  const [orders] = useOrders();

  return (
    <Layout>
      <div className="container py-5">

        {/* Welcome Banner */}
        <div className="card border-0 shadow-lg mb-4 rounded-4 overflow-hidden">
          <div
            className="p-4 text-white"
            style={{
              background:
                "linear-gradient(135deg,#1e3c72,#2a5298)"
            }}
          >
            <h2 className="fw-bold">
              Welcome Back 👋
            </h2>

            <p className="mb-0">
              Manage your profile, orders and account settings
            </p>
          </div>
        </div>

        <div className="row g-4">

          {/* Sidebar */}
          <div className="col-lg-3">

            <div className="card border-0 shadow rounded-4">

              <div className="card-body text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user"
                  width="90"
                  className="rounded-circle mb-3"
                />

                <h5 className="fw-bold">
                  User Dashboard
                </h5>

                <p className="text-muted small">
                  Manage your account
                </p>

                <div className="mt-3">
                  <span className="badge bg-primary p-2">
                    {orders?.length || 0} Orders
                  </span>
                </div>

              </div>

              <div className="list-group list-group-flush">

                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    `list-group-item border-0 py-3 ${
                      isActive
                        ? "bg-primary text-white"
                        : ""
                    }`
                  }
                >
                  <FaUserCircle className="me-2" />
                  Profile
                </NavLink>

                <NavLink
                  to="orders"
                  className={({ isActive }) =>
                    `list-group-item border-0 py-3 d-flex justify-content-between align-items-center ${
                      isActive
                        ? "bg-primary text-white"
                        : ""
                    }`
                  }
                >
                  <div>
                    <FaBoxOpen className="me-2" />
                    Orders
                  </div>

                  <span className="badge bg-dark">
                    {orders?.length}
                  </span>
                </NavLink>

              </div>

            </div>

          </div>

          {/* Right content area */}
          <div className="col-lg-9">

            <div
              className="card border-0 shadow rounded-4 p-4"
              style={{
                minHeight: "500px"
              }}
            >
              <Outlet />
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default UserDashboard;