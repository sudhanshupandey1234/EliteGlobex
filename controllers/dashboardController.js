const dashboardModel = require("../models/dashboardModel");

exports.showDashboard = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    dashboardModel.getDashboardStats((err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("dashboard", {
            user: req.session.user,
            totalCustomers: results[0].totalCustomers,
            totalProducts: results[0].totalProducts,
            totalOrders: results[0].totalOrders
        });

    });

};