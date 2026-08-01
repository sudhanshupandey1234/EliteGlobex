const orderModel = require("../models/orderModel");

// ==============================
// Order List
// ==============================
exports.getOrders = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    orderModel.getOrders((err, orders) => {

        if (err) {
            console.log("Order List Error:", err);
            return res.send("Database Error");
        }

        res.render("orders", {
            orders: orders
        });

    });

};

// ==============================
// Add Order Page
// ==============================
exports.showAddOrder = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    orderModel.getCustomers((err, customers) => {

        if (err) {
            console.log("Customer Error:", err);
            return res.send("Database Error");
        }

        orderModel.getProducts((err, products) => {

            if (err) {
                console.log("Product Error:", err);
                return res.send("Database Error");
            }

            res.render("addOrder", {
                customers: customers,
                products: products
            });

        });

    });

};
exports.saveOrder = (req, res) => {

    const {

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

    } = req.body;

    const orderData = [

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

    ];

    orderModel.saveOrder(orderData, (err) => {

        if (err) {

    console.log("MYSQL ERROR => ", err);

    return res.send(err.sqlMessage);

}

        res.redirect("/orders");

    });

};