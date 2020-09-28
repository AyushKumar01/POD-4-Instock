import React from "react";
import { Link } from "react-router-dom";
import sortIcon from "../assets/icons/sort-24px.svg";

const Warehouse = () => {
  return (
    <section className="warehouses">
      <div className="warehouses__header">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__subcontainer">
          <input
            className="warehouses__search-input"
            type="text"
            name="search"
            required="required"
            placeholder="Search..."
          />
          <Link to="/warehouses/add">
            <button className="warehouses__btn">+ Add New Warehouse</button>
          </Link>
        </div>
      </div>
      <div className="warehouses__title-block">
        <div className="warehouses__warehouse-block">
          <p className="warehouses__title-warehouse">WAREHOUSE</p>
          <img className="warehouses__sort-icon" src={sortIcon} alt="sort"/>
        </div>
        <div className="warehouses__address-block">
          <p className="warehouses__title-address">ADDRESS</p>
          <img className="warehouses__sort-icon" src={sortIcon} alt="sort"/>
        </div>
        <div className="warehouses__single-block">
          <p className="warehouses__title-name">CONTACT NAME</p>
          <img className="warehouses__sort-icon" src={sortIcon} alt="sort" />
        </div>
        <div className="warehouses__single-block">
          <p className="warehouses__title-name">CONTACT INFORMATION</p>
          <img className="warehouses__sort-icon" src={sortIcon} alt="sort" />
        </div>
        <p className="warehouses__title-name">ACTIONS</p>
      </div>
    </section>
  );
};

export default Warehouse;
