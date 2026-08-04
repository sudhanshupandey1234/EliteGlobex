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

    let {
        product_name,
        category,
        unit,
        price,
        description
    } = req.body;

    // Remove extra spaces
    product_name = product_name.trim();
    category = category.trim();
    unit = unit.trim();
    description = description.trim();

    // Product Name Validation
    if (product_name === "") {

        req.flash("error", "Product Name is required.");
        return res.redirect("/products/add");

    }

    // Category Validation
    if (category === "") {

        req.flash("error", "Category is required.");
        return res.redirect("/products/add");

    }

    // Unit Validation
    if (unit === "") {

        req.flash("error", "Unit is required.");
        return res.redirect("/products/add");

    }

    // Price Validation
    if (price <= 0) {

        req.flash("error", "Price must be greater than 0.");
        return res.redirect("/products/add");

    }

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

            req.flash("error", "Database Error.");

            return res.redirect("/products/add");

        }

        req.flash("success", "Product added successfully.");

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

    let {
        product_name,
        category,
        unit,
        price,
        description
    } = req.body;

    product_name = product_name.trim();
    category = category.trim();
    unit = unit.trim();
    description = description.trim();

    if (product_name === "") {

        req.flash("error", "Product Name is required.");
        return res.redirect("/products/edit/" + id);

    }

    if (category === "") {

        req.flash("error", "Category is required.");
        return res.redirect("/products/edit/" + id);

    }

    if (unit === "") {

        req.flash("error", "Unit is required.");
        return res.redirect("/products/edit/" + id);

    }

    if (price <= 0) {

        req.flash("error", "Price must be greater than 0.");
        return res.redirect("/products/edit/" + id);

    }

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

            req.flash("error", "Database Error.");

            return res.redirect("/products/edit/" + id);

        }

        req.flash("success", "Product updated successfully.");

        res.redirect("/products");

    });

};
// Delete Product
exports.deleteProduct = (req, res) => {

    const id = req.params.id;

    productModel.deleteProduct(id, (err) => {

        if (err) {

            if (err.code === "ER_ROW_IS_REFERENCED_2") {

                req.flash(
                    "error",
                    "Product cannot be deleted because it is used in existing orders."
                );

                return res.redirect("/products");

            }

            console.log(err);

            req.flash("error", "Database Error.");

            return res.redirect("/products");

        }

        req.flash(
            "success",
            "Product deleted successfully."
        );

        res.redirect("/products");

    });

};
