import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    classYear: ""
  });

  // Load user + products
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    // GET USER INFO
    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
          classYear: res.data.classYear || "",
        });
      })
      .catch((err) => console.log("Auth error:", err));

    // GET USER'S PRODUCTS
    axios
      .get("http://localhost:5000/api/products/my-products/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Products error:", err));
  }, []);

  // UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/products/edit/${id}",
        form,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;

    try {
      await axios.delete("http://localhost:5000/api/auth/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      localStorage.removeItem("token");
      window.location.href = "/register";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">

      {/* LEFT SIDEBAR */}
      <div className="left-box">
        <div className="profile-icon"></div>

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Class: {user.classYear || "Not Set"}</p>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>

        <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-box">

        {/* TABS */}
        <div className="tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>

          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            My Sell Products
          </button>
        </div>

        {/* PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="settings-box">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Class</label>
            <select
              value={form.classYear}
              onChange={(e) => setForm({ ...form, classYear: e.target.value })}
            >
              <option value="">Select Class</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        )}

        {/* SELL PRODUCTS */}
        {activeTab === "products" && (
          <div className="products-box">
            <h3>Your Products</h3>

            {products.length === 0 && (
              <p className="no-products">You haven't added any products yet.</p>
            )}

            {products.map((p) => (
              <div key={p._id} className="product-item">
                <img src={p.image?.url} alt="" />

                <div className="product-info">
                  <h4>{p.title}</h4>
                  <p>₹{p.sellingPrice}</p>
                </div>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => (window.location.href = `/edit-product/${p._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-product-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
