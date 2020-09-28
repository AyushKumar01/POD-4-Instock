import React, { Component } from "react";
import { Link } from "react-router-dom";
import InventoryNavbar from "../components/inventory/InventoryNavbar";
import InventoryItem from "../components/inventory/InventoryItem";
import DeleteInventory from "../components/inventory/DeleteInventoryItem";
import Footer from "../components/Footer";
import sortIcon from "../assets/icons/sort-24px.svg";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class Inventory extends Component {
  state = {
    inventory: [],
    openModal: false,
    currentID: null,
    warehouseId: null,
    currentItemName: "",
  };

  loadInventory = (warehouseID) => {
    console.log("warehouseID", warehouseID);
    if (warehouseID) {
      return axios.get(`${API_URL}/inventories?warehouseID=${warehouseID}`);
    }
    return axios.get(`${API_URL}/inventories`);
  };

  deleteItem = async () => {
    try {
      const id = this.state.currentID;
      await axios.delete(`${API_URL}/inventories/${id}`);
      this.setState({
        inventory: this.state.inventory.filter((item) => item.id !== id),
      });
      this.onCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  onOpenDeleteModal = (id, itemName) => {
    // console.log(id, itemName);
    this.setState({
      currentID: id,
      currentItemName: itemName,
      openModal: true,
    });
  };

  onCloseDeleteModal = () => {
    this.setState({
      currentID: null,
      currentItemName: "",
      openModal: false,
    });
  };

  async componentDidMount() {
    try {
      let id = new URLSearchParams(this.props.location.search).get("id");
      console.log(id);
      this.setState({
        warehouseId: id,
      });

      const { data } = await this.loadInventory(id);
      this.setState({ inventory: data });

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // console.log(this.state.openModal);
    return (
      <div style={{ position: "relative" }}>
        {this.state.openModal && (
          <DeleteInventory
            onDelete={this.deleteItem}
            onCloseDeleteModal={this.onCloseDeleteModal}
            currentItemName={this.state.currentItemName}
          />
        )}
        <InventoryNavbar />
        <section className="inventory-section">
          <div className="inventory__header">
            <h1 className="inventory__title">Inventory</h1>
            <div className="inventory__subcontainer">
              <input
                className="inventory__search-input"
                type="text"
                name="search"
                required="required"
                placeholder="Search..."
              />
              <Link to="/inventory/add">
                <button className="inventory__btn">+ Add New Item</button>
              </Link>
            </div>
          </div>
          {/* mimic responsive tbody to match exact width */}
          <div className="inventory__title-block">
            <div className="inventory__mobile-row inventory__mobile-row--w60">
              <div className="inventory__mobile-column inventory__mobile-column--w50">
                <div className="inventory__item-block inventory__item-block--w50">
                  <p className="inventory__title-item">INVENTORY ITEM</p>
                  <img className="inventory__sort-icon" src={sortIcon} alt="sortUp"/>
                </div>
                <div className="inventory__item-block inventory__item-block--w50">
                  <p className="inventory__title-item">CATEGORY</p>
                  <img className="inventory__sort-icon" src={sortIcon} alt="sortDown"/>
                </div>
              </div>
              <div className="inventory__mobile-column inventory__mobile-column--w50">
                <div className="inventory__item-block inventory__item-block--w50">
                  <p className="inventory__title-item">STATUS</p>
                  <img className="inventory__sort-icon" src={sortIcon} alt="sortUp"/>
                </div>
                <div className="inventory__item-block inventory__item-block--w50">
                  <p className="inventory__title-item">QTY</p>
                  <img className="inventory__sort-icon" src={sortIcon} alt="sortDown"/>
                </div>
              </div>
            </div>
            <div className="inventory__mobile-row inventory__mobile-row--w20">
              <div className="inventory__mobile-column">
                <div className="inventory__item-block inventory__item-block--w100">
                  <p className="inventory__title-item">WAREHOUSE</p>
                  <img className="inventory__sort-icon" src={sortIcon} alt="sort"/>
                </div>
              </div>
            </div>
            <div className="inventory__mobile-row inventory__mobile-row--w20">
              <div className="inventory__mobile-column">
                <div className="inventory__item-block inventory__item-block--w100">
                  <p className="inventory__title-item">ACTIONS</p>
                </div>
              </div>
            </div>
          </div>
          {this.state.inventory.map((item) => (
            <InventoryItem
              key={item.id}
              {...item}
              onOpenDeleteModal={this.onOpenDeleteModal}
            />
          ))}
        </section>

        <Footer />
      </div>
    );
  }
}

export default Inventory;
