exports.logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.send("Logout Error");
        }

        res.redirect("/login");

    });

};