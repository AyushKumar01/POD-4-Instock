import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import WarehouseNavbar from "../warehouses/WarehouseNavbar";
import Error from "../../assets/icons/error-24px.svg";
import Footer from "../Footer";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/warehouses";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validPhoneNo = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

class AddWarehouse extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      warehouseName: '',
      Address: '',
      City: '',
      Country: '',
      contactName: '',
      Position: '',
      Phone: '',
      Email: '',
      errors: {
        warehouseName: '',
        Address: '',
        City: '',
        Country: '',
        contactName: '',
        Position: '',
        Phone: '',
        Email: ''
      }
    };
  }

  getWarehouseById = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      if (id) {
        const { data } = await this.getWarehouseById(id);
        this.setState({ 
            id : id,
            warehouseName: data.name,
            Address: data.address,
            City: data.city,
            Country: data.country,
            contactName: data.contact.name,
            Position: data.contact.position,
            Phone: data.contact.phone,
            Email: data.contact.email
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    const errorMessage = 'Minimum 3 characters required!';
    switch (name) {
      case 'warehouseName': 
        errors.warehouseName = value.length < 3  ? errorMessage : '';
        break;
      case 'Address': 
        errors.Address = value.length < 3 ? errorMessage : '';
        break;
      case 'City': 
        errors.City = value.length < 3 ? errorMessage : '';
        break;
      case 'Country': 
        errors.Country = value.length < 3 ? errorMessage : '';
        break;
      case 'contactName': 
        errors.contactName = value.length < 3 ? errorMessage : '';
        break;
      case 'Position': 
        errors.Position = value.length < 3 ? errorMessage : '';
        break;
      case 'Phone': 
        errors.Phone = validPhoneNo.test(value) ? '' : 'Phone number is not valid';
        break;
      case 'Email': 
        errors.Email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }
 
  validate = (warehouseName, Address, City, Country, contactName, Position, Phone, Email) => {
    //const errors = null;
    let errors = this.state.errors;
    const errorMessage = "This field is required";
    if (warehouseName.length === 0) {
      errors.warehouseName = errorMessage;
    }
    if (Address.length === 0) {
      errors.Address = errorMessage;
    }
    if (City.length === 0) {
      errors.City = errorMessage;
    }
    if (Country.length === 0) {
      errors.Country = errorMessage;
    }
  
    if (contactName.length === 0) {
      errors.contactName = errorMessage;
    }
    if (Position.length === 0) {
      errors.Position = errorMessage;
    }
    if (Phone.length === 0) {
      errors.Phone = errorMessage;
    }
    if (Email.length === 0) {
      errors.Email = errorMessage;
    }
    return errors;
  }

  submitWarehouse = (event) => {
    event.preventDefault();

    const { id, warehouseName, Address, City, Country, contactName, Position, Phone, Email } = this.state;

    const errors = this.validate(warehouseName, Address, City, Country, contactName, Position, Phone, Email);
    if (errors.warehouseName || errors.Address || errors.City || errors.Country || errors.contactName || errors.Position
      || errors.Phone || errors.Email) {
      this.setState({ errors : errors });
      return;
    }

    let warehouse = {
      name: warehouseName,
      address: Address,
      city: City,
      country: Country,
      contact: { 
      name: contactName,
      position: Position,
      phone: Phone,
      email: Email
      }
    };

    if (id) {
      axios.put(`${API_URL}/${id}`, warehouse).then((response) => {
        console.log(response);
        this.props.history.push("/warehouses");
      });
      return;
    }else{
        axios.post(API_URL, warehouse).then((response) => {
            this.props.history.push("/warehouses");
          });
    }
  };

  render(){
    const {errors, warehouseName, Address, City, Country, contactName, Position, Phone, Email } = this.state;
    return (
      <>
        <WarehouseNavbar />
        <form className="edit-warehouse" onSubmit={this.submitWarehouse}>
          <div className="edit-warehouse__header">
            <Link to="/warehouses">
            <img className="edit-warehouse__back-icon" src={ArrowBackIcon} alt="Arrow Back Icon" />
            </Link>
            <h1 className="edit-warehouse__header-title">
            {this.props.match.params.id ? "Edit Warehouse" : "Add New Warehouse"}
            </h1>
          </div>
          <div className="edit-warehouse__info-wrapper">
          <div className="edit-warehouse__info-block">
            <h2 className="edit-warehouse__info-title">Warehouse Details</h2>
            <p className="edit-warehouse__label">Warehouse Name</p>
            <input
              className={errors.warehouseName && errors.warehouseName.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="warehouseName"
              value={warehouseName}
              placeholder="Warehouse Name" onChange={this.handleChange} 
            /><br></br>
            {errors.warehouseName && errors.warehouseName.length > 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.warehouseName}</span>}
            <p className="edit-warehouse__label">Street Address</p>
            <input
              className={errors.Address && errors.Address.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="Address"
              value={Address}
              placeholder="Street Address" onChange={this.handleChange} 
            /><br></br>
            {errors.Address && errors.Address.length> 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.Address}</span>}
            <p className="edit-warehouse__label">City</p>
            <input
              className={errors.City && errors.City.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="City"
              value={City}
              placeholder="City" onChange={this.handleChange} 
            /><br></br>
            {errors.City && errors.City.length > 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.City}</span>}
            <p className="edit-warehouse__label">Country</p>
            <input
              className={errors.Country && errors.Country.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="Country"
              value={Country}
              placeholder="Country" onChange={this.handleChange} 
            /><br></br>
            {errors.Country && errors.Country.length > 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.Country}</span>}
          </div>
          <div className="edit-warehouse__info-block">
            <h2 className="edit-warehouse__info-title">Contact Details</h2>
            <p className="edit-warehouse__label">Contact Name</p>
            <input
              className={errors.contactName && errors.contactName.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="contactName"
              value={contactName}
              placeholder="Contact Name" onChange={this.handleChange} 
            /><br></br>
            {errors.contactName && errors.contactName.length > 0 &&
             <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.contactName}</span>}
            <p className="edit-warehouse__label">Position</p>
            <input
              className={errors.Position && errors.Position.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="Position"
              value={Position}
              placeholder="Position" onChange={this.handleChange} 
            /><br></br>
            {errors.Position && errors.Position.length > 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.Position}</span>}
            <p className="edit-warehouse__label">Phone Number</p>
            <input
              className={errors.Phone && errors.Phone.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="Phone"
              value={Phone}
              placeholder="Phone Number" onChange={this.handleChange} 
            /><br></br>
            {errors.Phone && errors.Phone.length > 0 && 
            <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.Phone}</span>}
            <p className="edit-warehouse__label">Email</p>
            <input
              className={errors.Email && errors.Email.length > 0 ? "edit-warehouse__input-error edit-warehouse__input" : "edit-warehouse__input"}
              type="text"
              name="Email"
              value={Email}
              placeholder="Email" onChange={this.handleChange} 
            /><br></br>
            {errors.Email && errors.Email.length > 0 &&
             <span className='edit-warehouse__error'><img className='edit-warehouse__error-icon' src={Error} alt="Error"/>{errors.Email}</span>}
          </div>
          </div>
          <div className="edit-warehouse__buttons">
            <Link to="/warehouses">
              <button className="edit-warehouse__btn-cancel" type="reset">Cancel</button>
            </Link>
            <button className="edit-warehouse__btn-add" type="submit">
            {this.props.match.params.id ? "Save" : "+ Add Warehouse"}
            </button>
          </div>
        </form>
        <Footer />
      </>
    );
  }
};

export default AddWarehouse;