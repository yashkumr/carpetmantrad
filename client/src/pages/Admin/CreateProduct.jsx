import React, { useState, useEffect } from "react";
import AdminLayout from "../../adminComponents/AdminLayout.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
  const [material, setMaterial] = useState("");
  const [stock, setStock] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const[totalQuantity, setTotalQuantity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get all color
  const getAllColor = async () => {
    try {
      const { data } = await axios.get("/api/v1/color/get-color");
      if (data?.success) {
        setColors(data?.color);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting color");
    }
  };
  useEffect(() => {
    getAllColor();
  }, []);
  // get all size
  const getAllSize = async () => {
    try {
      const { data } = await axios.get("/api/v1/size/get-size");
      if (data?.success) {
        setSizes(data?.size);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in size");
    }
  };
  useEffect(() => {
    getAllSize();
  }, []);
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("productId", productId);
      productData.append("material", material);
      productData.append("stock", stock);
      productData.append("shipping", shipping);
      productData.append("description", description);
      productData.append("oldPrice", oldPrice);
      productData.append("price", price);
      productData.append("totalQuantity", totalQuantity);
      productData.append("quantity", quantity);
      productData.append("photo", photo);

      productData.append("color", color);
      productData.append("size", size);
      productData.append("category", category);

    
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log(productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <AdminLayout title={"Dashboard - Create Product"}>
        <div className="container-fluid mt-5 m-3 p-3 dashboard">
          <div className="row ">
            <div className="col-md-3 "></div>
            <div className="col-md-9 ">
              <h2>Create Product</h2>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="enter color"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setColor(value);
                    }}
                  >
                    {colors?.map((cl) => (
                      <Option key={cl._id} value={cl._id}>
                        {cl.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="enter size"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setSize(value);
                    }}
                  >
                    {sizes?.map((si) => (
                      <Option key={si._id} value={si._id}>
                        {si.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      multiple
                      className=""
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      {/* <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      /> */}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                      
                <div className="mb-3">
                  <input
                    type="Number"
                    value={productId}
                    placeholder="Enter Product Id"
                    className="form-control"
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={material}
                    placeholder="Enter Material"
                    className="form-control"
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={stock}
                    placeholder="Set Stock"
                    className="form-control"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={oldPrice}
                    placeholder="Old Price"
                    className="form-control"
                    onChange={(e) => setOldPrice(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                
                <div className="mb-3">
                  <input
                    type="number"
                    value={totalQuantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setTotalQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter Single quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateProduct;
