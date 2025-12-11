require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

async function seed() {
  await Product.deleteMany();

  await Product.insertMany([
    { name: "iPhone 14", price: 70000, description: "Apple phone", stock: 20 },
    { name: "Samsung TV", price: 45000, description: "Smart TV", stock: 10 },
    { name: "Shoes", price: 2000, description: "Nike Shoes", stock: 50 }
  ]);

  console.log("Products added");
  process.exit();
}

seed();
