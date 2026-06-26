import { useParams, useNavigate } from "react-router-dom";
import "../styles/Item.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

 const handleBuyNow = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    alert("Please login to chat or buy");
    navigate("/login");
    return;
  }

  if (user._id === product.owner) {
    alert("You cannot buy your own product.");
    return;
  }

  // SEND PRODUCT ID to ChatPage
  navigate(`/chat/${product._id}`);
};


  return (
    <div className="page-container">
      <div className="product-card">
        <div className="image-section">
          <img src={product.image?.url} alt="Product" />
        </div>

        <div className="details-section">
          <h1 className="title">{product.title}</h1>

          <div className="price-box">
            <p className="original-price"><s>₹{product.originalPrice}</s></p>
            <p className="selling-price">₹{product.sellingPrice}</p>
          </div>

          <p className="description">{product.description}</p>

          <div className="info-box">
            <p><strong>Owner:</strong> {product.ownerName}</p>
            <p><strong>Contact:</strong> {product.contactNumber}</p>
          </div>

          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
