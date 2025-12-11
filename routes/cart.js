const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem
} = require("../controllers/cartController");

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.put("/:id", auth, updateCartItem);
router.delete("/:id", auth, deleteCartItem);

module.exports = router;
