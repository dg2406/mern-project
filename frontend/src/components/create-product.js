import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // HANDLE CREATE PRODUCT
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div
        className="container-fluid m-3 p-3"
        style={{ minHeight: "100vh", overflowY: "auto" }}
      >
        <div className="col-md-9">
          <h1>Create Product</h1>

          <div className="m-1 w-75">
            {/* CATEGORY SELECT */}
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
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
                  name="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="200px"
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            {/* NAME */}
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control mb-3"
              onChange={(e) => setName(e.target.value)}
            />

            {/* DESCRIPTION */}
            <textarea
              value={description}
              placeholder="Write a description"
              className="form-control mb-3"
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* PRICE */}
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="form-control mb-3"
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* QUANTITY */}
            <input
              type="number"
              value={quantity}
              placeholder="Write quantity"
              className="form-control mb-3"
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* SHIPPING */}
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              className="form-select mb-3"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
