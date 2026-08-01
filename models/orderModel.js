const db = require("../config/db");

// ==============================
// Get All Customers
// ==============================
const getCustomers = (callback) => {

    db.query(
        "SELECT id, customer_name FROM customers ORDER BY customer_name ASC",
        callback
    );

};

// ==============================
// Get All Products
// ==============================
const getProducts = (callback) => {

    db.query(
        "SELECT id, product_name, price FROM products WHERE status='Active' ORDER BY product_name ASC",
        callback
    );

};

// ==============================
// Get All Orders
// ==============================
const getOrders = (callback) => {

    const sql = `
        SELECT
            orders.*,
            customers.customer_name
        FROM orders
        JOIN customers
        ON customers.id = orders.customer_id
        ORDER BY orders.id DESC
    `;

    db.query(sql, callback);

};


// ==============================
// Save Order
// ==============================

const saveOrder = (orderData, callback) => {

    const sql = `
        INSERT INTO orders
        (
            customer_id,
            order_date,
            total_amount,
            paid_amount,
            pending_amount,
            payment_status,
            delivery_status,
            tracking_number,
            courier_name,
            remarks
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, orderData, callback);

};

// ==============================
// Save Order Items
// ==============================

const saveOrderItem = (itemData, callback) => {

    const sql = `
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity,
            price,
            subtotal
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, itemData, callback);

};

// ==============================
// Delete Order
// ==============================

const deleteOrder = (id, callback) => {

    const sql = "DELETE FROM orders WHERE id = ?";

    db.query(sql, [id], callback);

};


module.exports = {

    getCustomers,
    getProducts,
    getOrders,
    saveOrder,
    saveOrderItem,
    deleteOrder

};