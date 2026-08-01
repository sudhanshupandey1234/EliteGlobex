const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/dashboard", dashboardController.showDashboard);

module.exports = router;