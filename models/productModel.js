const db = require("../config/db");

// Get All Products
const getAllProducts = (callback) => {

    const sql = "SELECT * FROM products ORDER BY id DESC";

    db.query(sql, callback);

};

// Get Product By ID
const getProductById = (id, callback) => {

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], callback);

};

// Add Product
const addProduct = (productData, callback) => {

    const sql = `
        INSERT INTO products
        (product_name, category, unit, price, description, product_image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, productData, callback);

};

// Update Product
const updateProduct = (productData, id, callback) => {

    const sql = `
        UPDATE products
        SET
        product_name = ?,
        category = ?,
        unit = ?,
        price = ?,
        description = ?,
        product_image = ?
        WHERE id = ?
    `;

    db.query(sql, [...productData, id], callback);

};

// Delete Product
const deleteProduct = (id, callback) => {

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], callback);

};

module.exports = {

    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct

};