import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { useCart } from "../context/cart";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState({});
  const [cart, setCart] = useCart();

  // Add item or increase quantity
  const increaseQty = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
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

  // Get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data.category);

        data.category.forEach((cat) => {
          getProductsByCategory(cat.slug);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get products of a category
  const getProductsByCategory = async (slug) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${slug}`
      );

      setProductsByCat((prev) => ({
        ...prev,
        [slug]: data.products,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="category-page container-fluid py-4">
        {categories.map((cat) => (
          <div key={cat._id} className="cat-section">
            <h3 className="cat-title">
              {cat.name.charAt(0).toUpperCase() +
                cat.name.slice(1)}
            </h3>

            <div className="cat-products">
              {(productsByCat[cat.slug] || []).map((product) => {
                const cartItem = cart.find(
                  (item) => item._id === product._id
                );

                return (
                  <div
                    className="cat-item"
                    key={product._id}
                  >
                    <div className="cat-card">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="cat-img"
                      />

                      <div className="cat-body">
                        <h6 className="cat-name">
                          {product.name}
                        </h6>

                        <p className="cat-desc">
                          {product.description.substring(
                            0,
                            35
                          )}
                          ...
                        </p>

                        <span className="cat-price">
                          ₹{product.price}
                        </span>

                        {!cartItem ? (
                          <button
                            className="btn btn-primary mt-2 w-100"
                            onClick={() =>
                              increaseQty(product)
                            }
                          >
                            + Add
                          </button>
                        ) : (
                          <div className="home-qty mt-2">
                            <button
                              onClick={() =>
                                decreaseQty(product._id)
                              }
                            >
                              -
                            </button>

                            <span>
                              {cartItem.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQty(product)
                              }
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Category;