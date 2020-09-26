const fs = require("fs"); // file system module
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// json data to read and write
const warehouseFile = path.join(__dirname, "../db/warehouses.json");

// common function to read json file from warehouses.json
function listWarehouse(callback) {
  fs.readFile(warehouseFile, (error, data) => {
    if (error) throw error;
    const warehouse = JSON.parse(data);
    callback(warehouse);
  });
}

// function to get single warehouse from the list (ById).
function getByID(req, callback) {
  const warehouseId = req.params.id;
  listWarehouse((warehouses) => {
    const warehouseIndex = warehouses.findIndex(
      (warehouse) => warehouse.id === warehouseId
    );
    if (warehouseIndex !== -1) {
      callback(warehouses[warehouseIndex]);
    } else {
      callback({ message: `warehouse with the id ${warehouseId} not found` });
    }
  });
}

// function to create a new Warehouse
function Warehouse(data) {
  this.id = uuidv4();
  this.name = data.name;
  this.address = data.address;
  this.city = data.city;
  this.country = data.country;
  this.contact = {
    name: data.contact.name,
    position: data.contact.position,
    phone: data.contact.phone,
    email: data.contact.email,
  };
}

// function to add a new Warehouse
function addWarehouse(data) {
  listWarehouse((Warehouses) => {
    const newWarehouse = new Warehouse(data);
    Warehouses.push(newWarehouse);
    writeNewDataInFile(Warehouses);
  });
}

// delete warehouse by id
function deleteWarehouse(req, callback) {
  const warehouseId = req.params.id;
  listWarehouse((warehouses) => {
    const warehouseIndex = warehouses.findIndex(
      (warehouse) => warehouse.id === warehouseId
    );
    if (warehouseIndex !== -1) {
      warehouses.splice(warehouseIndex, 1);
      writeNewDataInFile(warehouses);
      callback({
        message: `warehouse with the id ${warehouseId} deleted successfully`,
      });
    } else {
      callback({ message: `warehouse with the id ${warehouseId} not found` });
    }
  });
}

// common function to write json file in warehouses.json
function writeNewDataInFile(warehouses) {
  fs.writeFile(warehouseFile, JSON.stringify(warehouses), (error) => {
    if (error) console.log(error);
    console.log("file has been saved");
  });
}

// function to update warehouse ById.
function updateWarehouse(req, callback) {
  const data = req.body;
  const warehouseId = req.params.id;
  if (data) {
    listWarehouse((warehouses) => {
      const warehouseIndex = warehouses.findIndex(
        (warehouse) => warehouse.id === warehouseId
      );
      if (warehouseIndex !== -1) {
        const selectedWarehouse = warehouses[warehouseIndex];
        selectedWarehouse.name = data.name;
        selectedWarehouse.address = data.address;
        selectedWarehouse.city = data.city;
        selectedWarehouse.country = data.country;
        selectedWarehouse.contact = {
          name: data.contact.name,
          position: data.contact.position,
          phone: data.contact.phone,
          email: data.contact.email,
        };
        writeNewDataInFile(warehouses);
        // callback(warehouses);
        callback(selectedWarehouse);
      } else {
        callback({ message: `warehouse with the id ${id} not found` });
      }
    });
  }
}

// export functions
module.exports = {
  listWarehouse,
  getByID,
  addWarehouse,
  deleteWarehouse,
  updateWarehouse,
};
