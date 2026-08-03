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
// ==============================
// View Order
// ==============================

const getOrderDetails = (id, callback) => {

    const sql = `
        SELECT
            o.*,
            c.customer_name,
            c.company_name,
            c.phone,
            c.email,
            c.address,
            oi.quantity,
            oi.price,
            oi.subtotal,
            p.product_name

        FROM orders o

        JOIN customers c
        ON o.customer_id = c.id

        JOIN order_items oi
        ON oi.order_id = o.id

        JOIN products p
        ON p.id = oi.product_id

        WHERE o.id = ?
    `;

    db.query(sql, [id], callback);

};
// ==============================
// Get Order By ID
// ==============================

const getOrderById = (id, callback) => {

    const sql = `
        SELECT
            o.*,
            c.customer_name,
            oi.product_id,
            oi.quantity,
            oi.price,
            oi.subtotal,
            p.product_name

        FROM orders o

        JOIN customers c
        ON c.id = o.customer_id

        JOIN order_items oi
        ON oi.order_id = o.id

        JOIN products p
        ON p.id = oi.product_id

        WHERE o.id = ?
    `;

    db.query(sql, [id], callback);

};
// ==============================
// Update Order
// ==============================

const updateOrder = (data, callback) => {

    const sql = `
        UPDATE orders
        SET
            customer_id=?,
            order_date=?,
            total_amount=?,
            paid_amount=?,
            pending_amount=?,
            payment_status=?,
            delivery_status=?,
            tracking_number=?,
            courier_name=?,
            remarks=?
        WHERE id=?
    `;

    db.query(sql, data, callback);

};

module.exports = {

    getCustomers,
    getProducts,
    getOrders,
    saveOrder,
    saveOrderItem,
    deleteOrder,
    getOrderDetails,
    getOrderById,
    updateOrder

};