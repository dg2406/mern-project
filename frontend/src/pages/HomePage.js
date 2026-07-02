import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState([0, 100000]);
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
 
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
  const getCategories = async () => {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data?.success) setCategories(data.category);
  };

  const filterProducts = async (pageNo = 1) => {
    const { data } = await axios.post("/api/v1/product/product-filters", {
      checked: selectedCats,
      price,
      sort,
      keyword,
      page: pageNo,
    });

    if (pageNo === 1) setProducts(data.products);
    else setProducts((prev) => [...prev, ...data.products]);

    setTotal(data.total);
  };

  const handleCategory = (checked, id) => {
    let all = [...selectedCats];
    if (checked) all.push(id);
    else all = all.filter((c) => c !== id);
    setSelectedCats(all);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    filterProducts(nextPage);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    filterProducts(1);
  }, [selectedCats, price, sort, keyword]);

  return (
    <Layout>
      <div className="homepage-bg">
        <div className="container-fluid py-4">
          <div className="row g-4">
            {/* SIDEBAR */}
            <div className="col-md-3 col-lg-2">
              <div className="sidebar glass">
                <h6>Active Filters</h6>

                <div className="mb-3">
                  {selectedCats.map((id) => {
                    const cat = categories.find((c) => c._id === id);
                    return (
                      <span className="chip" key={id}>
                        {cat?.name}
                        <button
                          onClick={() =>
                            setSelectedCats(
                              selectedCats.filter((c) => c !== id)
                            )
                          }
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>

                <h5>Categories</h5>
                {categories.map((c) => (
                  <div key={c._id}>
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(c._id)}
                      onChange={(e) => handleCategory(e.target.checked, c._id)}
                    />{" "}
                    {c.name}
                  </div>
                ))}

                <h5 className="mt-3">Price</h5>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={price[1]}
                  onChange={(e) => setPrice([0, Number(e.target.value)])}
                />
                <p>Up to ₹{price[1]}</p>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    setSelectedCats([]);
                    setPrice([0, 100000]);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* MAIN */}
            <div className="col-md-9 col-lg-10">
              <div className="search-bar-wrapper glass mb-3">
                <input
                  className="search-input"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <select
                  className="sort-dropdown"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="low">Price ↑</option>
                  <option value="high">Price ↓</option>
                </select>
              </div>

              <div className="hero-banner">
                <h1 className="hero-title">🔥 50% OFF</h1>

                <button className="hero-btn">Shop Now</button>
              </div>
              <div className="explore-header  d-flex justify-content-between align-items-center mb-3 px-3 py-2">
                <h3 className="fw-bold mb-0">Explore Products</h3>
                <span className="results-text">{total} results</span>
              </div>
              <div className="row">
  {products.map((product) => {
    const cartItem = cart.find(
      (item) => item._id === product._id
    );

    return (
      <div className="col-md-3 mb-4" key={product._id}>
        <div className="product-card glass">
          <div className="badge-discount">20% OFF</div>

          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="product-img"
            alt={product.name}
          />

          <h6>{product.name}</h6>

          <p className="desc">
            {product.description.substring(0, 30)}...
          </p>

          <div className="rating">★★★★☆</div>

          <div className="price">₹{product.price}</div>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-primary w-100"
              onClick={() =>
                navigate(`/product/${product.slug}`)
              }
            >
              Details
            </button>

            {!cartItem ? (
              <button
                className="btn btn-primary"
                onClick={() => increaseQty(product)}
              >
                + Add
              </button>
            ) : (
              <div className="home-qty">
                <button
                  onClick={() =>
                    decreaseQty(product._id)
                  }
                >
                  -
                </button>

                <span>{cartItem.quantity}</span>

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

{products.length < total && (
  <button
    className="btn btn-dark"
    onClick={loadMore}
  >
    Load More
  </button>
)}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;