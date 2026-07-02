import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../components/layout";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useOrders } from "../context/order";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [orders, setOrders] = useOrders();
  const makePayment = async () => {

    try {
  
      // create order object from cart
      const newOrder = {
        id: Date.now(),
        products: cart,
        status: "Processing",
        createdAt: new Date(),
        total: totalPrice()
      };
  
      const updatedOrders = [
        ...orders,
        newOrder
      ];
  
      setOrders(updatedOrders);
  
      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );
  
      const response = await axios.post(
        "/api/v1/payment/checkout",
        { cart }
      );
  
      console.log(
        "Backend response:",
        response.data
      );
  
      window.location.href =
        response.data.url;
  
    } catch(error){
  
      console.log(error);
  
      toast.error(
        "Payment failed"
      );
    }
  };
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Item removed from cart");
  };

  const increaseQty = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (pid) => {
    const updatedCart = cart
      .map((item) =>
        item._id === pid
          ? {
              ...item,
              quantity: (item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = () => {
    return cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
  };

  const totalPrice = () => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="container py-4">
          <div className="cart-header">
            <h2>🛒 Shopping Cart</h2>
            <p>{totalItems()} item(s) in your cart</p>
          </div>

          <div className="row">
            {/* LEFT */}
            <div className="col-lg-8">
              {cart.length === 0 ? (
                <div className="empty-cart glass">
                  <h4>Your cart is empty</h4>
                </div>
              ) : (
                cart.map((product) => (
                  <div
                    className="cart-item glass"
                    key={product._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="cart-img"
                    />

                    <div className="cart-info">
                      <h5>{product.name}</h5>

                      <p>
                        {product.description?.substring(
                          0,
                          80
                        )}
                        ...
                      </p>

                      <h6>
                        ₹{product.price} ×{" "}
                        {product.quantity || 1}
                      </h6>

                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            decreaseQty(product._id)
                          }
                        >
                          -
                        </button>

                        <span>
                          {product.quantity || 1}
                        </span>

                        <button
                          className="qty-btn"
                          onClick={() =>
                            increaseQty(product._id)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeCartItem(product._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT */}
            <div className="col-lg-4">
              <div className="summary-card glass">
                <h3>Order Summary</h3>

                <hr />

                <div className="summary-row">
                  <span>Total Products</span>
                  <span>{totalItems()}</span>
                </div>

                <div className="summary-row">
                  <span>Total Amount</span>
                  <span>₹{totalPrice()}</span>
                </div>

                <button
  className="checkout-btn"
  onClick={makePayment}
  disabled={cart.length===0}
>
  Proceed To Checkout
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;