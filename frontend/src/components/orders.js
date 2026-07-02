import { useOrders } from "../context/order";

const Orders = () => {

  const [orders] = useOrders();

  const recentProducts = orders
    ?.flatMap((order) => order.products);

  return (
    <div>

      <h2 className="fw-bold mb-4">
        Recent Orders
      </h2>

      {recentProducts?.length === 0 ? (

        <div className="text-center mt-5">

          <img
            src="https://cdn-icons-png.flaticon.com/512/7466/7466073.png"
            width="150"
            alt="empty"
          />

          <h5 className="mt-3">
            No Orders Yet
          </h5>

          <p className="text-muted">
            Your orders will appear here
          </p>

        </div>

      ) : (

        recentProducts.map((item) => (

          <div
            key={item._id}
            className="card border-0 shadow-sm rounded-4 mb-3"
          >

            <div className="card-body">

              <div className="d-flex align-items-center">

                <img
                  src={`/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  width="90"
                  height="90"
                  className="rounded"
                />

                <div className="ms-4">

                  <h5 className="fw-bold">
                    {item.name}
                  </h5>

                  <p className="text-muted mb-1">
                    {item.description?.substring(
                      0,
                      70
                    )}...
                  </p>

                  <h6>
                    ₹{item.price}
                  </h6>

                  <span className="badge bg-success">
                    Processing
                  </span>

                </div>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default Orders;