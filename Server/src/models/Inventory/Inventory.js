const fs = require("fs"); // file system module
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// json data to read and write
const inventoryFile = path.join(__dirname, "../../db/inventoryItem.json");

// common function to read json file from inventory.json
function listInventory(callback) {
  fs.readFile(inventoryFile, (error, data) => {
    if (error) throw error;
    const inventory = JSON.parse(data);
    callback(inventory);
  });
}

// function to get single inventory from the list (ById).
function getByID(req, callback) {
  const inventoryId = req.params.id;
  listInventory((inventory) => {
    const inventoryIndex = inventory.findIndex(
      (inventory) => inventory.id === inventoryId
    );
    if (inventoryIndex !== -1) {
      callback(inventory[inventoryIndex]);
    } else {
      callback({ message: `inventory with the id ${inventoryId} not found` });
    }
  });
}

// function to create a new inventory
function inventory(data) {
  this.id = uuidv4();
  this.itemName = data.itemName;
  this.description = data.description;
  this.category = data.category;
  this.status = data.status;
  this.quantity = data.quantity;
  this.warehouseName = data.warehouseName;
}

// function to add a new inventory
function addInventory(data) {
  listInventory((inventory) => {
    const newinventory = new inventory(data);
    inventory.push(newinventory);
    writeNewDataInFile(inventory);
  });
}

// delete inventory by id
function deleteInventory(req, callback) {
  const inventoryId = req.params.id;
  listInventory((inventory) => {
    const inventoryIndex = inventory.findIndex(
      (inventory) => inventory.id === inventoryId
    );
    if (inventoryIndex !== -1) {
      inventory.splice(inventoryIndex, 1);
      writeNewDataInFile(inventory);
      callback({
        message: `inventory with the id ${inventoryId} deleted successfully`,
      });
    } else {
      callback({ message: `inventory with the id ${inventoryId} not found` });
    }
  });
}

// common function to write json file in inventory.json
function writeNewDataInFile(inventory) {
  fs.writeFile(inventoryFile, JSON.stringify(inventory), (error) => {
    if (error) console.log(error);
    console.log("file has been saved");
  });
}

// function to update inventory ById.
function updateInventory(req, callback) {
  const data = req.body;
  const inventoryId = req.params.id;
  if (data) {
    listInventory((inventory) => {
      const inventoryIndex = inventory.findIndex(
        (inventory) => inventory.id === inventoryId
      );
      if (inventoryIndex !== -1) {
        const selectedinventory = inventory[inventoryIndex];
        selectedinventory.itemName = data.itemName;
        selectedinventory.description = data.description;
        selectedinventory.category = data.category;
        selectedinventory.status = data.status;
        selectedinventory.quantity = data.quantity;
        selectedinventory.warehouseName = data.warehouseName;
        writeNewDataInFile(inventory);
        // callback(inventory);
        callback(selectedinventory);
      } else {
        callback({ message: `inventory with the id ${id} not found` });
      }
    });
  }
}

// export functions
module.exports = {
  listInventory,
  getByID,
  addInventory,
  deleteInventory,
  updateInventory,
};
