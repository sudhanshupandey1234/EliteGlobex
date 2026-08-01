const db = require("../config/db");

// Dashboard Statistics
exports.getDashboardStats = (callback) => {

    const sql = `
        SELECT
        (SELECT COUNT(*) FROM customers) AS totalCustomers,
        (SELECT COUNT(*) FROM products) AS totalProducts,
        (SELECT COUNT(*) FROM orders) AS totalOrders
    `;

    db.query(sql, callback);

};