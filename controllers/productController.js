const productModel = require("../models/productModel");

// Product List
exports.getProducts = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    productModel.getAllProducts((err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("products", {
            products: results
        });

    });

};

// Add Product Page
exports.showAddProduct = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("addProduct");

};
// Save Product
exports.saveProduct = (req, res) => {

    const {
        product_name,
        category,
        unit,
        price,
        description
    } = req.body;

    const productData = [
        product_name,
        category,
        unit,
        price,
        description,
        null
    ];

    productModel.addProduct(productData, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/products");

    });

};
// Edit Product Page
exports.showEditProduct = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const id = req.params.id;

    productModel.getProductById(id, (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (results.length === 0) {
            return res.send("Product Not Found");
        }

        res.render("editProduct", {
            product: results[0]
        });

    });

};
// Update Product
exports.updateProduct = (req, res) => {

    const id = req.params.id;

    const {
        product_name,
        category,
        unit,
        price,
        description
    } = req.body;

    const productData = [
        product_name,
        category,
        unit,
        price,
        description,
        null
    ];

    productModel.updateProduct(productData, id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/products");

    });

};
// Delete Product
exports.deleteProduct = (req, res) => {

    const id = req.params.id;

    productModel.deleteProduct(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/products");

    });

};