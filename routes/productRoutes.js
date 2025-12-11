const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: "Product not found" });
  res.json(product);
});

// Create new product (Protected — need token)
router.post("/", auth, async (req, res) => {
  const { name, price, description, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ msg: "Name, price and stock are required" });
  }

  const product = new Product({
    name,
    price,
    description,
    stock
  });

  await product.save();
  res.status(201).json(product);
});

module.exports = router;
