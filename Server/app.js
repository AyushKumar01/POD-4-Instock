const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes");
const inventoryControllers = require("./src/controllers/Inventory/InventoryController");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

app.listen(5000, () => {
  console.log("Instock app listening on port 5000!");
});
