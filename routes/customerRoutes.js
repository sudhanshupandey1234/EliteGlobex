const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

// Customer List
router.get("/customers", customerController.getCustomers);

// Add Customer Page
router.get("/customers/add", customerController.showAddCustomer);

// Save Customer
router.post("/customers/add", customerController.saveCustomer);

// Edit Customer
router.get("/customers/edit/:id", customerController.showEditCustomer);

// Update Customer
router.post("/customers/update/:id", customerController.updateCustomer);

// Delete Customer
router.get("/customers/delete/:id", customerController.deleteCustomer);

module.exports = router;