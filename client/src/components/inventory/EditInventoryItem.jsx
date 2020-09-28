import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import InventoryNavbar from "../inventory/InventoryNavbar";
import Footer from "../Footer";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class EditInventoryItem extends Component {
  state = {
    id: null,
    warehouseID: null,
    warehouseName: "",
    itemName: "",
    description: "",
    category: "",
    status: "",
    quantity: 0,
    categories: [],
    warehouses: [],
  };

  loadItem = (id) => {
    return axios.get(`${API_URL}/inventories/${id}`);
  };

  loadCategory = () => {
    return axios.get(`${API_URL}/inventories/category`);
  };

  loadWarehouse = () => {
    return axios.get(`${API_URL}/inventories/warehouses`);
  };

  async componentDidMount() {
    // console.log(this.props.match);
    const { id } = this.props.match.params;
    try {
      const { data: warehouseData } = await this.loadWarehouse();
      const { data: categoryData } = await this.loadCategory();
      if (id) {
        const { data: itemData } = await this.loadItem(id);
        this.setState({
          ...itemData,
        });
      }
      // console.log(warehouseData);
      this.setState({
        categories: categoryData,
        warehouses: warehouseData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  setItemName = (event) => {
    // console.log(event.target.value);
    this.setState({ itemName: event.target.value });
  };

  setCategory = (event) => {
    // console.log(event.target.value);
    this.setState({ category: event.target.value });
  };

  setDescription = (event) => {
    // console.log(event.target.value);
    this.setState({ description: event.target.value });
  };

  setStatus = (event) => {
    // console.log(event.target.value);
    this.setState({ status: event.target.value });
  };

  setWarehouse = (event) => {
    const selectedWarehouse = this.state.warehouses.filter(warehouse => warehouse.name === event.target.value);
    if(selectedWarehouse && selectedWarehouse.length > 0){
      this.setState({warehouseName : event.target.value, warehouseID: selectedWarehouse[0].warehouseID });
    }
  };

  setQuantity = (event) => {
    // console.log(event.target.value);
    this.setState({ quantity: event.target.value });
  };

  submitItem = async (e) => {
    e.preventDefault();

    try {
      const { id, warehouses, categories, ...rest } = this.state;
      // console.log(rest);
      if (id) {
        await axios.put(`${API_URL}/inventories/${id}`, rest);
        this.props.history.push("/inventory");
        return;
      }
      await axios.post(`${API_URL}/inventories`, rest);
      this.props.history.push("/inventory");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.state);
    // console.log(this.state.categories);
    return (
      <>
        <InventoryNavbar />
        <form className="edit-inventory" onSubmit={this.submitItem}>
          <div className="edit-inventory__header">
            <Link to="/inventory">
              <img className="edit-inventory__back-icon" src={ArrowBackIcon}  alt="back"/>
            </Link>
            <h1 className="edit-inventory__header-title">
              {this.props.match.params.id
                ? "Edit Inventory Item"
                : "Add New Inventory Item"}
            </h1>
          </div>
          <div className="edit-inventory__info-block">
            <h2 className="edit-inventory__info-title">Item Details</h2>
            <p className="edit-inventory__label">Item Name</p>
            <input
              className="edit-inventory__input"
              type="text"
              placeholder="Item Name"
              value={this.state.itemName}
              onChange={this.setItemName}
            />
            <p className="edit-inventory__label">Description</p>
            <textarea
              className="edit-inventory__input"
              type="text"
              placeholder="Please enter a brief description..."
              value={this.state.description}
              onChange={this.setDescription}
            />
            <p className="edit-inventory__label">Category</p>
            <select
              value={this.state.category}
              onChange={this.setCategory}
              className="edit-inventory__input--dropdown"
            >
              {!this.props.match.params.id && <option>Please Select</option>}
              {this.state.categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-inventory__info-block">
            <h2 className="edit-inventory__info-title">Item Availability</h2>
            <p className="edit-inventory__label">Status</p>
            <div className="edit-inventory__radio-container">
              <div className="edit-inventory__radio-subcontainer">
                <input
                  name="status"
                  className="edit-inventory__radio-btn"
                  type="radio"
                  value="In Stock"
                  checked={this.state.status === "In Stock"}
                  onChange={this.setStatus}
                />
                <p className="edit-inventory__radio-label">In stock</p>
              </div>
              <div className="edit-inventory__radio-subcontainer">
                <input
                  name="status"
                  className="edit-inventory__radio-btn"
                  type="radio"
                  value="Out of Stock"
                  checked={this.state.status === "Out of Stock"}
                  onChange={this.setStatus}
                />

                <p className="edit-inventory__radio-label">Out of stock</p>
              </div>
            </div>
            {!this.props.match.params.id && (
              <>
                <p className="edit-inventory__label">Quantity</p>
                <input
                  className="edit-inventory__input"
                  type="text"
                  placeholder="0"
                  value={this.state.quantity}
                  onChange={this.setQuantity}
                />
              </>
            )}

            <p className="edit-inventory__label">Warehouse</p>
            <select
              className="edit-inventory__input--dropdown"
              value={this.state.warehouseName}
              onChange={this.setWarehouse}
            >
              {!this.props.match.params.id && <option>Please Select</option>}
              {this.state.warehouses.map(({ name, warehouseID }) => (
                <option value={name} key={warehouseID}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-inventory__buttons">
            <Link to="/inventory">
              <button className="edit-inventory__btn-cancel">Cancel</button>
            </Link>
            <button className="edit-inventory__btn-save" type="submit">
              {this.props.match.params.id ? "Save" : "+ Add Item"}
            </button>
          </div>
        </form>
        <Footer />
      </>
    );
  }
}

export default EditInventoryItem;
