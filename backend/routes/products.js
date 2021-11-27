const { Product } = require("../models/products");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({ succes: false });
  }

  res.send(productList);
});
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({ succes: false });
  }

  res.send(product);
});
router.get(`/`, async (req, res) => {
  let productList = await Product.find();
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  if (!product) return res.status(400).send("The product cannot be created");

  res.send(product);
});
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) {
    res.status(500).json({ message: "The product with given id was found" });
  }
  res.status(200).send(product);
});
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((Product) => {
      if (Product) {
        return res.status(200).json({
          success: true,
          message: "The Product Is Deleted Successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "The Product Not Found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
