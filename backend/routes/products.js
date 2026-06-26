const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");


// -----------------------------
// ⭐ GET USER'S OWN PRODUCTS (must be BEFORE /:id)
// -----------------------------
router.get("/my-products/list", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


// -----------------------------
// CREATE PRODUCT
// -----------------------------
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      image: { url: req.body.image?.url || "" },
      originalPrice: Number(req.body.originalPrice),
      sellingPrice: Number(req.body.sellingPrice),
      contactNumber: String(req.body.contactNumber),
      owner: req.user._id,
      ownerName: req.user.name || req.user.prn,
    });

    await product.save();
    res.json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -----------------------------
// GET ALL PRODUCTS
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -----------------------------
// GET SINGLE PRODUCT  ⭐ KEEP THIS LAST
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -----------------------------
// EDIT PRODUCT
// -----------------------------
router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ message: "Product updated", product });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -----------------------------
// DELETE PRODUCT
// -----------------------------
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
