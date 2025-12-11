const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const cartItem = new Cart({
    user: req.user.id,
    product: productId,
    quantity
  });

  await cartItem.save();
  res.json({ msg: "Item added to cart" });
};

// Get cart items
exports.getCart = async (req, res) => {
  const cart = await Cart.find({ user: req.user.id }).populate("product");
  res.json(cart);
};

// Update cart item by ID
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  const updatedItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true }
  ).populate("product");

  if (!updatedItem) {
    return res.status(404).json({ msg: "Cart item not found" });
  }

  res.json(updatedItem);
};

// Delete cart item
exports.deleteCartItem = async (req, res) => {
  const deleted = await Cart.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ msg: "Cart item not found" });
  }

  res.json({ msg: "Cart item removed" });
};
