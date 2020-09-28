import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import "./styles/app.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import WarehouseDetails from "./components/warehouses/WarehouseDetails";
import AddWarehouse from "./components/warehouses/AddWarehouse";
import Inventory from "./pages/Inventory";
import InventoryItemDetails from "./components/inventory/InventoryItemDetails";
import EditInventoryItem from "./components/inventory/EditInventoryItem";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/warehouses" component={App} exact />
        <Route path="/warehouses/add" component={AddWarehouse} exact />
        <Route path="/warehouses/:id/details" component={WarehouseDetails} exact />
        <Route path="/warehouses/:id/edit" component={AddWarehouse} exact />

        <Route path="/inventory" component={Inventory} exact />
        <Route path="/inventory/add" component={EditInventoryItem} exact />
        <Route
          path="/inventory/:id/details"
          component={InventoryItemDetails}
          exact
        />
        <Route path="/inventory/:id/edit" component={EditInventoryItem} exact />

        <Route component={NotFound} />
      </Switch>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
