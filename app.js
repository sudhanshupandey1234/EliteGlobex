const express = require("express");
const customerRoutes = require("./routes/customerRoutes");
const path = require("path");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();
const orderRoutes = require("./routes/orderRoutes");

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

//routes

app.use("/", authRoutes);

app.use("/", customerRoutes);

app.use("/", productRoutes);

app.use("/", dashboardRoutes);

app.use("/", orderRoutes);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
    res.render("login");
});


app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
});