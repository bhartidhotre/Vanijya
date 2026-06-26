import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import EditProduct from "./components/EditProduct";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Add_Item from "./pages/AddProductPage"; 
import AddProduct from "./components/AddProduct";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import ItemPage from "./pages/ItemPage";
import FooterPage from "./pages/FooterPage";
import ChatPage from "./pages/ChatPage";
function App() {
  // Logged-in user
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const loggedUser = JSON.parse(storedUser);
        setUser(loggedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("user"); 
      }
    }
  }, []);

  return (
    <>
      {/* Navbar always visible */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <hr />
              <ProductPage />
              <Footer />
            </>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/productpage" element={<ProductPage />} />
        <Route
          path="/add_item"
          element={user ? <Add_Item /> : <Login setUser={setUser} />}
        />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/itempage/:id" element={<ItemPage />} />
        <Route path="/footerpage" element={<FooterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/chat/:productId" element={<ChatPage />} />

      </Routes>
    </>
  );
}

export default App;
