const customerModel = require("../models/customerModel");

// ==============================
// Customer List
// ==============================
exports.getCustomers = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const search = req.query.search || "";

    customerModel.getAllCustomers(search, (err, results) => {

        if (err) {
            console.log(err);
            req.flash("error", "Database Error.");
            return res.redirect("/dashboard");
        }

        res.render("customers", {
            customers: results,
            search
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

    let {
        customer_name,
        company_name,
        phone,
        email,
        address
    } = req.body;

    // Remove extra spaces
    customer_name = customer_name.trim();
    company_name = company_name.trim();
    phone = phone.trim();
    email = email.trim();
    address = address.trim();

    // Customer Name Validation
    if (customer_name === "") {
        return res.send("Customer Name is required.");
    }

    // Phone Validation
    if (!/^[0-9]{10}$/.test(phone)) {
        return res.send("Phone number must be exactly 10 digits.");
    }

    // Email Validation (only if entered)
    if (email !== "" && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.send("Invalid Email Address.");
    }

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

        req.flash("success", "Customer added successfully.");

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

        req.flash("success", "Customer updated successfully.");

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

            if (err.code === "ER_ROW_IS_REFERENCED_2") {

                req.flash(
                    "error",
                    "Customer cannot be deleted because orders exist for this customer."
                );

                return res.redirect("/customers");

            }

            console.log(err);

            req.flash("error", "Database Error.");

            return res.redirect("/customers");

        }

        req.flash(
            "success",
            "Customer deleted successfully."
        );

        res.redirect("/customers");

    });

};