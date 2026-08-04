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
        remarks,

        product_id,
        quantity,
        price

    } = req.body;

    // =========================
// Validation
// =========================

if (!customer_id) {

    req.flash("error", "Please select a customer.");

    return res.redirect("/orders/add");

}

if (!product_id || product_id.length === 0) {

    req.flash("error", "Please add at least one product.");

    return res.redirect("/orders/add");

}

if (Number(total_amount) <= 0) {

    req.flash("error", "Total amount must be greater than 0.");

    return res.redirect("/orders/add");

}

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

    orderModel.saveOrder(orderData, (err, result) => {

        if (err) {

    console.log(err);

    req.flash("error", "Database Error.");

    return res.redirect("/orders/add");

}




        const orderId = result.insertId;

        // ==========================
        // Save Products
        // ==========================

        for (let i = 0; i < product_id.length; i++) {

            const subtotal = quantity[i] * price[i];

            const itemData = [

                orderId,
                product_id[i],
                quantity[i],
                price[i],
                subtotal

            ];

            orderModel.saveOrderItem(itemData, (err) => {

                if (err) {

                    console.log(err);

                }

            });

        }

        req.flash("success", "Order created successfully.");

res.redirect("/orders");

    });

};
// ==============================
// Delete Order
// ==============================

exports.deleteOrder = (req, res) => {

    const id = req.params.id;

    orderModel.deleteOrder(id, (err) => {

        if (err) {

            console.log(err);

            return res.send(err.sqlMessage);

        }

        res.redirect("/orders");

    });

};
// ==============================
// View Order
// ==============================

exports.viewOrder = (req, res) => {

    const id = req.params.id;

    orderModel.getOrderDetails(id, (err, result) => {

        if (err) {

            console.log(err);

            return res.send(err.sqlMessage);

        }

        res.render("viewOrder", {

            order: result

        });

    });

};
// ==============================
// Show Edit Order Page
// ==============================

exports.showEditOrder = (req, res) => {

    const id = req.params.id;

    orderModel.getOrderById(id, (err, order) => {

        if (err) {

            console.log(err);

            return res.send(err.sqlMessage);

        }

        orderModel.getCustomers((err, customers) => {

            if (err) {

                console.log(err);

                return res.send(err.sqlMessage);

            }

            orderModel.getProducts((err, products) => {

                if (err) {

                    console.log(err);

                    return res.send(err.sqlMessage);

                }

                res.render("editOrder", {

                    order,
                    customers,
                    products

                });

            });

        });

    });

};

// ==============================
// Update Order
// ==============================

exports.updateOrder = (req, res) => {

    const id = req.params.id;

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

    const data = [
        customer_id,
        order_date,
        total_amount,
        paid_amount,
        pending_amount,
        payment_status,
        delivery_status,
        tracking_number,
        courier_name,
        remarks,
        id
    ];

    orderModel.updateOrder(data, (err) => {

        if (err) {
            console.log(err);
            return res.send(err.sqlMessage);
        }

        res.redirect("/orders");

    });

};