const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/orders", orderController.getOrders);

// View Order
router.get("/orders/view/:id", orderController.viewOrder);

// Edit Order Page
router.get("/orders/edit/:id", orderController.showEditOrder);

// Update Order
router.post("/orders/edit/:id", orderController.updateOrder);

router.get("/orders/add", orderController.showAddOrder);

// Save Order
router.post("/orders/add", orderController.saveOrder);

// Delete Order
router.get("/orders/delete/:id", orderController.deleteOrder);


module.exports = router;

