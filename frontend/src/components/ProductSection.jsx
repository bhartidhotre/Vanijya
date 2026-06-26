import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Product.css";
import { Link } from "react-router-dom";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  // Fetch all products from backend
  useEffect(() => {
    axios
      .get("https://vanijya.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 product">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length === 0 && (
            <p className="text-gray-600">No products available.</p>
          )}

          {products.map((product) => (
            <div key={product._id} className="group relative">

              {/* CORRECT LINK WITH PRODUCT ID */}
              <Link to={`/itempage/${product._id}`}>

                <img
                  alt={product.image?.url}
                  src={product.image?.url}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      {product.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.description?.substring(0, 30)}...
                    </p>
                  </div>

                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.sellingPrice}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
