import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import rightIcon from "../../assets/icons/chevron_right-24px.svg";

function WarehouseInfoCard(props) {
  const {
    id,
    name,
    address,
    city,
    country,
    contact: { name: contactName, phone, email },
  } = props.warehouseData;
  // console.log(props);

  return (
    <>
      <div className="warehouse">
        <div className="warehouse__container">
          <div className="warehouse__subcontainer">
            <div className="warehouse__info-block">
              <p className="warehouse__title">WAREHOUSE</p>
              <div className="warehouse__name-container">
                <Link to={`/warehouses/${id}/details`}>
                  <p className="warehouse__name">{name}</p>
                </Link>
                <img
                  className="warehouse__name-arrow"
                  src={rightIcon}
                  alt="rightIcon"
                />
              </div>
            </div>
            <div className="warehouse__info-block">
              <p className="warehouse__title">ADDRESS</p>
              <p className="warehouse__subtitle--address">
                {address + " " + city + " " + country}
              </p>
            </div>
          </div>
          <div className="warehouse__subcontainer">
            <div className="warehouse__info-block">
              <p className="warehouse__title">CONTACT NAME</p>
              <p className="warehouse__subtitle">{contactName}</p>
            </div>
            <div className="warehouse__info-block">
              <p className="warehouse__title">CONTACT INFORMATION</p>
              <p className="warehouse__subtitle">{phone}</p>
              <p className="warehouse__subtitle">{email}</p>
            </div>
          </div>
        </div>
        <div className="warehouse__buttons">
          <img
            onClick={() => props.onOpenDeleteModal(id, name)}
            role="button"
            className="warehouse__btn"
            src={deleteIcon}
            alt="delete"
          />
          <Link to={`/warehouses/${id}/edit`}>
            <img className="warehouse__btn" src={editIcon} alt="editIcon" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default WarehouseInfoCard;
