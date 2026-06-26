import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    originalPrice: "",
    sellingPrice: "",
    contactNumber: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in!");
      navigate("/login");
      return;
    }

    try {
      const productData = {
        title: form.title,
        description: form.description,
        image: { url: form.imageUrl },
        originalPrice: form.originalPrice,
        sellingPrice: form.sellingPrice,
        contactNumber: form.contactNumber,
        ownerName: user.name,
      };

      await axios.post("http://localhost:5000/api/products/add", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product added successfully!");
      navigate("/productpage");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-container">
      <div className="add-box">
        <h1>Add New Product</h1>
        <p className="subtitle">Fill the details below to list your product</p>

        <form onSubmit={handleSubmit} className="form-container">

          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter product title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Write something about the product..."
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <div className="price-grid">
            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="₹1000"
              />
            </div>

            <div className="form-group">
              <label>Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={form.sellingPrice}
                onChange={handleChange}
                placeholder="₹800"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="Your number"
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}
