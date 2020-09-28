import React from "react";
import { Link } from "react-router-dom";
import WarehouseNavbar from "./WarehouseNavbar";
import InventoryItem from "../inventory/InventoryItem";
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import EditIcon from "../../assets/icons/edit-24px.svg";
import Footer from "../Footer";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class WarehouseDetails extends React.Component {
  state = {
    warehouseDetail: null,
    inventory: []
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
       if (id) {
        const { data: itemData } = await this.getDetails(id);
        const { data } = await this.loadInventory(id);
        this.setState({
          warehouseDetail: itemData,
          inventory: data
        });
      }      
    } catch (error) {
      console.log(error);
    }
  }

  loadInventory = (warehouseID) => {
    return axios.get(`${API_URL}/inventories?warehouseID=${warehouseID}`);
  };

  getDetails = (id) => {
    return axios.get(`${API_URL}/warehouses/${id}`);
  };

  render(){
      if(this.state.warehouseDetail){
        const { name, address, city, country, contact: { name: contactName, phone, email }} = this.state.warehouseDetail;
        return (
          <>
            <WarehouseNavbar />
            <div className="warehouse-details">
              <div className="warehouse-details__header">
                <div className="warehouse-details__header-subcontainer">
                  <Link to="/warehouses">
                    <img alt="back"
                      className="warehouse-details__back-icon"
                      src={ArrowBackIcon}
                    />
                  </Link>
                <h1 className="warehouse-details__header-title">{name}</h1>
                </div>
                <Link to="/warehouses/:id/edit">
                  <img className="warehouse-details__edit-icon" src={EditIcon} alt="edit"/>
                </Link>
              </div>
              <div className="warehouse-details__contact-info">
                <div className="warehouse-details__address-block">
                  <p className="warehouse-details__title">WAREHOUSE ADDRESS</p>
                  <p className="warehouse-details__subtitle">
                    {address}
                  </p>
                  <p className="warehouse-details__subtitle">{city}</p>
                  <p className="warehouse-details__subtitle">{country}</p>
                </div>
      
                <div className="warehouse-details__subcontainer">
                  <div className="warehouse-details__info-block warehouse-details__info-block-left">
                    <p className="warehouse-details__title">CONTACT NAME</p>
                    <p className="warehouse-details__subtitle">{contactName}</p>
                    <p className="warehouse-details__subtitle">Warehouse Manager</p>
                  </div>
                  <div className="warehouse-details__info-block">
                    <p className="warehouse-details__title">CONTACT INFORMATION</p>
                    <p className="warehouse-details__subtitle">{phone} </p>
                    <p className="warehouse-details__subtitle">{email}</p>
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
            </div>
            <Footer />
          </>
        );
      }else{
        return <></>
      }
  }
}


export default WarehouseDetails;
