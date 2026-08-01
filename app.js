const express = require("express");
const customerRoutes = require("./routes/customerRoutes");
const path = require("path");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "eliteglobex_secret_key",
    resave: false,
    saveUninitialized: false
}));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);

app.use("/", customerRoutes);

app.use("/", productRoutes);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/dashboard", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    db.query("SELECT COUNT(*) AS totalCustomers FROM customers", (err, customerResult) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, productResult) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            db.query("SELECT COUNT(*) AS totalOrders FROM orders", (err, orderResult) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                res.render("dashboard", {

                    user: req.session.user,

                    totalCustomers: customerResult[0].totalCustomers,

                    totalProducts: productResult[0].totalProducts,

                    totalOrders: orderResult[0].totalOrders

                });

            });

        });

    });

});

app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
});