import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal,Tooltip } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(false);
const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Product",
      content: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      async onOk() {
        try {
          const { data } = await axios.delete(
            `/api/v1/product/delete-product/${id}`
          );

          if (data?.success) {
            toast.success("Product Deleted");
            getAllProducts();
          }
        } catch (error) {
          console.log(error);
          toast.error("Delete failed");
        }
      },
    });
  };

  return (
    <div>
      <h2 className="mb-3">All Products</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((p) => (
            <tr key={p._id}>
              
              {/* IMAGE WITH HOVER + CLICK */}
              <td>
              <Tooltip title="Click to preview">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  width="100"
                  height="100"
                  title="Click to preview"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={() =>
                    setPreview({
                      visible: true,
                      img: `/api/v1/product/product-photo/${p._id}`,
                    })
                  }
                />
                </Tooltip>
              </td>

              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>{p.quantity}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() =>
                    navigate(`/dashboard/admin/update-product/${p.slug}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* IMAGE PREVIEW MODAL */}
      <Modal
        open={preview.visible}
        footer={null}
        onCancel={() => setPreview({ visible: false, img: "" })}
        centered
      >
        <img
          src={preview.img}
          alt="preview"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default Products;