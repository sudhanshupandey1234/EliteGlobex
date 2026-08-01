const customerModel = require("../models/customerModel");

// ==============================
// Customer List
// ==============================
exports.getCustomers = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    customerModel.getAllCustomers((err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("customers", {
            customers: results
        });

    });

};

// ==============================
// Add Customer Page
// ==============================
exports.showAddCustomer = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("addCustomer");

};

// ==============================
// Save Customer
// ==============================
exports.saveCustomer = (req, res) => {

    const {
        customer_name,
        company_name,
        phone,
        email,
        address
    } = req.body;

    const customerData = [
        customer_name,
        company_name,
        phone,
        email,
        address
    ];

    customerModel.addCustomer(customerData, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/customers");

    });

};

// ==============================
// Edit Customer Page
// ==============================
exports.showEditCustomer = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const id = req.params.id;

    customerModel.getCustomerById(id, (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (results.length === 0) {
            return res.send("Customer Not Found");
        }

        res.render("editCustomer", {
            customer: results[0]
        });

    });

};

// ==============================
// Update Customer
// ==============================
exports.updateCustomer = (req, res) => {

    const id = req.params.id;

    const {
        customer_name,
        company_name,
        phone,
        email,
        address
    } = req.body;

    const customerData = [
        customer_name,
        company_name,
        phone,
        email,
        address
    ];

    customerModel.updateCustomer(customerData, id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/customers");

    });

};

// ==============================
// Delete Customer
// ==============================
exports.deleteCustomer = (req, res) => {

    const id = req.params.id;

    customerModel.deleteCustomer(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/customers");

    });

};