import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logos/InStock-Logo.svg";

const InventoryNavbar = () => {
  return (
    <section className="navbar">
      <Link to="/">
        <img className="navbar__logo" src={Logo} alt="logo"/>
      </Link>
      <div className="navbar__bottom-container">
        <Link to="/warehouses">
          <button className="navbar__btn">Warehouses</button>
        </Link>
        <Link to="/inventory">
          <button className="navbar__btn navbar__btn--active">Inventory</button>
        </Link>
      </div>
    </section>
  );
};

export default InventoryNavbar;
