import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      const p = data.product;

      setName(p.name);
      setId(p._id);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setCategory(p.category._id);
      setShipping(p.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };



  return (
    <div
    className="container-fluid m-3 p-3"
    style={{ minHeight: "100vh", overflowY: "auto" }}
  >
      <h2 className="mb-3">Update Product</h2>

      <div className="w-75">

        {/* CATEGORY */}
        <Select
          bordered={false}
          size="large"
          className="form-select mb-3"
          value={category}
          onChange={(value) => setCategory(value)}
        >
          {categories?.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>

        {/* PHOTO */}
        <div className="mb-3">
          <label className="btn btn-outline-secondary">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              hidden
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>

        <div className="mb-3">
          <img
            src={
              photo
                ? URL.createObjectURL(photo)
                : `/api/v1/product/product-photo/${id}`
            }
            alt="product"
            height="200"
          />
        </div>

        {/* NAME */}
        <input
          type="text"
          value={name}
          className="form-control mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          className="form-control mb-3"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* PRICE */}
        <input
          type="number"
          value={price}
          className="form-control mb-3"
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* QUANTITY */}
        <input
          type="number"
          value={quantity}
          className="form-control mb-3"
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* SHIPPING */}
        <Select
          bordered={false}
          size="large"
          className="form-select mb-3"
          value={shipping ? "1" : "0"}
          onChange={(value) => setShipping(value)}
        >
          <Option value="0">No</Option>
          <Option value="1">Yes</Option>
        </Select>

        {/* BUTTONS */}
        <button className="btn btn-primary me-2" onClick={handleUpdate}>
          Update Product
        </button>

       
      </div>
    </div>
  );
};

export default UpdateProduct;