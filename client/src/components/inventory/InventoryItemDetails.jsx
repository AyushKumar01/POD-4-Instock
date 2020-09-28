import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import EditIcon from "../../assets/icons/edit-24px.svg";
import InventoryNavbar from "../inventory/InventoryNavbar";
import Footer from "../Footer";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class InventoryItemDetails extends Component {
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
    // console.log(event.target.value);
    this.setState({ warehouseName: event.target.value });
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
    return (
      <>
        <InventoryNavbar />
        <div className="inventory-details">
          <div className="inventory-details__header">
            <div className="inventory-details__header-subcontainer">
              <Link to="/inventory">
                <img
                  className="inventory-details__back-icon" alt="back"
                  src={ArrowBackIcon}
                />
              </Link>
              <h1 className="inventory-details__header-title">
                {this.state.itemName}
              </h1>
            </div>
            <Link to={`/inventory/${this.state.id}/edit`}>
              <img className="inventory-details__edit-icon" src={EditIcon}  alt="edit"/>
            </Link>
          </div>
          <div className="inventory-details__details-block">
            <div className="inventory-details__main-block">
              <div className="inventory-details__single-block">
                <p className="inventory-details__title">ITEM DESCRIPTION</p>

                <p className="inventory-details__subtitle--description">
                  {this.state.description}
                </p>
              </div>

              <div className="inventory-details__single-block">
                <p className="inventory-details__title">CATEGORY</p>

                <p className="inventory-details__subtitle">
                  {this.state.category}
                </p>
              </div>
            </div>
            <div className="inventory-details__secondary-block">
              <div className="inventory-details__subcontainer">
                <div className="inventory-details__info-block">
                  <p className="inventory-details__title">STATUS</p>
                  <p
                    className={
                      !this.state.status
                        ? "inventory-details__subtitle--inStock"
                        : "inventory-details__subtitle--outStock"
                    }
                  >
                    {this.state.status}
                  </p>
                </div>
                <div className="inventory-details__info-block">
                  <p className="inventory-details__title">QUANTITY</p>
                  <p className="inventory-details__subtitle">
                    {this.state.quantity}
                  </p>
                </div>
              </div>
              <div className="inventory-details__single-block">
                <p className="inventory-details__title">WAREHOUSE</p>
                <p className="inventory-details__subtitle">
                  {this.state.warehouseName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default InventoryItemDetails;
