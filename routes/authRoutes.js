const express = require("express");
const router = express.Router();
const db = require("../config/db");



router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) {
    console.error(err);
    return res.send(err.message);
}
console.log(results);

        if (results.length === 0) {
            return res.send("❌ User Not Found");
        }

        const user = results[0];

        if (user.password !== password) {
            return res.send("❌ Wrong Password");
        }

        req.session.user = {
    id: user.id,
    name: user.full_name,
    role: user.role
};

res.redirect("/dashboard");
    });

});

// ==============================
// Logout
// ==============================

router.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.send("Logout Error");
        }

        res.redirect("/login");

    });

});

module.exports = router;