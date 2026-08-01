const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// Product List
router.get("/products", productController.getProducts);

// Add Product Page
router.get("/products/add", productController.showAddProduct);

// Save Product
router.post("/products/add", productController.saveProduct);

// Edit Product
router.get("/products/edit/:id", productController.showEditProduct);

// Update Product
router.post("/products/update/:id", productController.updateProduct);

// Delete Product
router.get("/products/delete/:id", productController.deleteProduct);

module.exports = router;

