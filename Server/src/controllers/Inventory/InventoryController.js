const express = require("express");
const fs = require("fs");
const UUID = require("uuid").v4;
const inventoryController = express.Router();
const inventoryData = require("../../db/inventoryItem.json");
const categories = require("../../db/categories.json");
const warehouses = require("../../db/warehouses.json");
const fullPath = __dirname + "/../../db/inventoryItem.json";
// load model
const inventory = require("../../models/Inventory/Inventory");

function loadJSON() {
  const json = fs.readFileSync(fullPath, {
    encoding: "utf8",
  });
  return JSON.parse(json);
}

function save(saveData) {
  fs.writeFileSync(fullPath, JSON.stringify(saveData, null, 4));
}

function filterByWarehouseId(warehouseID) {
  const inventory = loadJSON();
  return inventory.filter((el) => el.warehouseID == warehouseID);
}

function deleteInventoryItem(itemId) {
  const data = loadJSON();
  const item = data.findIndex((el) => el.id == itemId);
  if (item > -1) {
    data.splice(item, 1);
    save(data);
  }
  return data;
}

function createInventory(payload) {
  payload.id = UUID();
  const data = loadJSON();
  data.push(payload);
  save(data);
}

// create API for categories
inventoryController.get("/category", (req, res, next) => {
  res.status(200).send(categories);
});

// create API for warehouses
inventoryController.get("/warehouses", (req, res, next) => {
  res.status(200).send(
    warehouses.map((el) => {
      return {
        name: el.name,
        warehouseID: el.id,
      };
    })
  );
});

//get inventory for all
inventoryController.get("/", (req, res, next) => {
  let inventories = [];
  const warehouseID = req.query.warehouseID;
  if (warehouseID) {
    inventories = inventoryData.filter((el) => el.warehouseID == warehouseID);
  } else {
    inventories = inventoryData;
  }
  const data = inventories.map((el) => ({
    id: el.id,
    warehouseID: el.warehouseID,
    itemName: el.itemName,
    category: el.category,
    status: el.status,
    quantity: el.quantity,
    warehouseName: el.warehouseName,
  }));
  res.status(200).send(data);
});

// //get inventory based on warehouse ID
// inventoryController.get("/bywarehouse/:id", (req, res) => {
//   try {
//     if (req.params.id) {
//       const inventory = filterByWarehouseId(req.params.id);
//       res.status(200).send(inventory);
//     }
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// });

//get inventory based on a single ID
inventoryController.get("/:id", (req, res) => {
  try {
    if (req.params.id) {
      console.log(req.params);
      const itemId = req.params.id;
      const inventory = inventoryData.find((Item) => Item.id == itemId);
      res.status(200).send(inventory);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Add a new Inventory Item
inventoryController.post("/", (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    createInventory(data);
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete an Inventory Item

inventoryController.delete("/:id", (req, res) => {
  try {
    if (req.params.id) {
      console.log(req.params);
      const itemId = req.params.id;
      res.status(200).send(deleteInventoryItem(itemId));
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// update existing inventory
inventoryController.put("/:id", (req, res) => {
  const { itemName, description, category, status, warehouseName } = req.body;

  if (!itemName || !description || !category || !status || !warehouseName) {
    return res.status(400).send({
      error: `inventory body must contain  ${Object.keys(req.body)}`,
    });
  }
  // console.log("check");
  inventory.updateInventory(req, (inventory) => {
    res.json(inventory);
  });
});

module.exports = inventoryController;
