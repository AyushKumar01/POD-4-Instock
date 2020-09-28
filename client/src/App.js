import React from "react";
import WarehouseNavbar from "./components/warehouses/WarehouseNavbar";
import Warehouses from "./pages/Warehouses";
import WarehouseItem from "./components/warehouses/WarehouseItem";
import DeleteWarehouse from "./components/warehouses/DeleteWarehouse";
import Footer from "./components/Footer";
import axios from "axios";
const API_URL = "http://localhost:5000/warehouses";

class App extends React.Component {
  state = {
    wareHouses: [],
    openModal: false,
    currentID: null,
    currentItemName: ""
  };

  componentDidMount() {
    this.getWarehouse();
  }

  // get request function
  getWarehouse = () => {
    axios
      .get(`${API_URL}`)
      .then((response) =>
        this.setState({
          wareHouses: response.data,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  
  deleteItem = async () => {
    try {
      const id = this.state.currentID;
      await axios.delete(`${API_URL}/${id}`);
        this.getWarehouse();
      this.onCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  onOpenDeleteModal = (id, itemName) => {
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

  render() {
    return (
      <>
      <div style={{ position: "relative" }}>
        {this.state.openModal && (
          <DeleteWarehouse
            onDelete={this.deleteItem}
            onCloseDeleteModal={this.onCloseDeleteModal}
            currentItemName={this.state.currentItemName}
          />
        )}
        <WarehouseNavbar />
        <section className="warehouses-section">
          <Warehouses />
          {this.state.wareHouses &&
            this.state.wareHouses.map((warehouse) => (
              <WarehouseItem key={warehouse.id} warehouseData={warehouse} onOpenDeleteModal={this.onOpenDeleteModal}/>
            ))}
          {/* <DeleteWarehouse /> */}
        </section>
        <Footer />
        </div>
      </>
    );
  }
}

export default App;
