const express = require("express");
const router = express.Router();
const warehouseController = require("./src/controllers/warehouseController"); // import controller
const inventoryController = require("./src/controllers/Inventory/InventoryController");

router.use("/warehouses", warehouseController);
router.use("/inventories", inventoryController);
module.exports = router;
