import React, { useState, useEffect } from "react";
import AdminLayout from "../../adminComponents/AdminLayout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <AdminLayout>
        <div className="container-fluid ">
          <h2 className="text-center mt-2">All Products List</h2>
          <div className="row  dashboard">
            <div className="col-md-3 mt-2"></div>
            <div className="col-md-9 mt-3">
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "14rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top "
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title m-2 text-dark">{p.name}</h5>
                        <p className="card-text mt-3">{p.description}</p>
                        <p className="card-text mt-3">Rs:{p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Products;
