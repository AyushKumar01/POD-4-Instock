const express = require("express");
const warehouse = require("../models/warehouseModel");
const warehouseController = express.Router();

warehouseController.get("/", (req, res) => {
  warehouse.listWarehouse((warehouses) => {
    res.json(warehouses);
  });
});

// get warehouse by id

warehouseController.get("/:id", (req, res) => {
  warehouse.getByID(req, (warehouse) => {
    res.json(warehouse);
  });
});

// add new warehouse in list
warehouseController.post("/", (req, res) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact
  ) {
    return res.status(400).send({
      error: "warehouse body must contain all requiredProperties",
      requiredProperties: ["name", "address", "city", "country", "contact"],
    });
  }
  if (
    !req.body.contact.name ||
    !req.body.contact.position ||
    !req.body.contact.phone ||
    !req.body.contact.email
  ) {
    return res.status(400).send({
      error: "warehouse body must contain all requiredProperties",
      requiredProperties: ["name", "position", "phone", "email"],
    });
  }
  warehouse.addWarehouse(req.body);
  res.json("Warehouse saved");
});

// delete a warehouse from list
warehouseController.delete("/:id", (req, res) => {
  warehouse.deleteWarehouse(req, (warehouse) => {
    res.json(warehouse);
  });
});

// update existing warehouse
warehouseController.put("/:id", (req, res) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact
  ) {
    return res.status(400).send({
      error: "warehouse body must contain all requiredProperties",
      requiredProperties: ["name", "address", "city", "country", "contact"],
    });
  }
  if (
    !req.body.contact.name ||
    !req.body.contact.position ||
    !req.body.contact.phone ||
    !req.body.contact.email
  ) {
    return res.status(400).send({
      error: "warehouse body must contain all requiredProperties",
      requiredProperties: ["name", "position", "phone", "email"],
    });
  }
  // console.log("check");
  warehouse.updateWarehouse(req, (warehouse) => {
    res.json(warehouse);
  });
});

// export functions
module.exports = warehouseController;
