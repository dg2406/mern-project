import React from "react";
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="search-bar-container shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <h4 className="logo">🛒 ShopEase</h4>

        {/* CATEGORY + SEARCH */}
        <div className="search-box d-flex">
          <select className="form-select category-select">
            <option>All Categories</option>
            <option>Men</option>
            <option>Women</option>
            <option>Watches</option>
          </select>

          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for products..."
          />

          <button className="btn search-btn">
            <FaSearch />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="icons d-flex gap-3">
          <FaUser />
          <FaHeart />
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;