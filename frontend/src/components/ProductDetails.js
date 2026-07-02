import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">

        <div className="col-md-6">
              {product._id && (
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="img-fluid rounded"
                />
              )}
            </div>

          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h4>₹ {product.price}</h4>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;