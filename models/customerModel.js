const db = require("../config/db");

// Get All Customers
const getAllCustomers = (callback) => {

    const sql = "SELECT * FROM customers ORDER BY id DESC";

    db.query(sql, callback);

};

// Get Customer By ID
const getCustomerById = (id, callback) => {

    const sql = "SELECT * FROM customers WHERE id = ?";

    db.query(sql, [id], callback);

};

// Add Customer
const addCustomer = (customerData, callback) => {

    const sql = `
        INSERT INTO customers
        (customer_name, company_name, phone, email, address)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, customerData, callback);

};

// Update Customer
const updateCustomer = (customerData, id, callback) => {

    const sql = `
        UPDATE customers
        SET
        customer_name = ?,
        company_name = ?,
        phone = ?,
        email = ?,
        address = ?
        WHERE id = ?
    `;

    db.query(sql, [...customerData, id], callback);

};

// Delete Customer
const deleteCustomer = (id, callback) => {

    const sql = "DELETE FROM customers WHERE id = ?";

    db.query(sql, [id], callback);

};

module.exports = {

    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer

};