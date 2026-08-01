const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/orders", orderController.getOrders);

router.get("/orders/add", orderController.showAddOrder);

// Save Order
router.post("/orders/add", orderController.saveOrder);

// Delete Order
router.get("/orders/delete/:id", orderController.deleteOrder);


module.exports = router;

