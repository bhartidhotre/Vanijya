import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/editProduct.css";   // <-- NEW CSS FILE

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    sellingPrice: "",
    image: { url: "" },
  });

  // Fetch product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/edit/${id}`,
        form,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Product updated!");
      navigate("/profile");

    } catch (error) {
      alert(error.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Product</h2>

        <label>Product Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter product title"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />

        <label>Selling Price (₹)</label>
        <input
          name="sellingPrice"
          value={form.sellingPrice}
          onChange={handleChange}
          placeholder="Enter price"
        />

        <button className="update-btn" onClick={updateProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
}
