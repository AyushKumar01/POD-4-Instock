import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import rightIcon from "../../assets/icons/chevron_right-24px.svg";

const InventoryItem = (props) => {
  console.log(props);
  console.log(props.status);
  return (
    <>
      <div className="inventory-item">
        <div className="inventory-item__mobile-row inventory-item__mobile-row--w60">
          <div className="inventory-item__mobile-column inventory-item__mobile-column--w50">
            <div className="inventory-item__flex inventory-item__flex--w50">
              <p className="inventory-item__title">INVENTORY ITEM</p>
              <div className="inventory-item__name-container">
                <Link to={`/inventory/${props.id}/details`}>
                  <p className="inventory-item__name">{props.itemName}</p>
                </Link>
                <img className="inventory-item__name-arrow" src={rightIcon}  alt="rightArrow"/>
              </div>
            </div>
            <div className="inventory-item__flex inventory-item__flex--w50">
              <p className="inventory-item__title">CATEGORY</p>

              <p className="inventory-item__subtitle">{props.category}</p>
            </div>
          </div>

          <div className="inventory-item__mobile-column inventory-item__mobile-column--w50">
            <div className="inventory-item__flex inventory-item__flex--w50">
              <p className="inventory-item__title">STATUS</p>
              <p
                className={
                  props.status === "In Stock"
                    ? "inventory-details__subtitle--inStock"
                    : "inventory-details__subtitle--outStock"
                }
              >
                {props.status}
              </p>
            </div>
            <div className="inventory-item__flex inventory-item__flex--w50">
              <p className="inventory-item__title">QTY</p>
              <p className="inventory-item__subtitle">{props.quantity}</p>
            </div>
          </div>
        </div>
        <div className="inventory-item__mobile-row inventory-item__mobile-row--w20">
          <div className="inventory-item__mobile-column">
            <div className="inventory-item__flex inventory-item__flex--w100">
              <p className="inventory-item__title">WAREHOUSE</p>
              <p className="inventory-item__subtitle">{props.warehouseName}</p>
            </div>
          </div>
        </div>
        <div className="inventory-item__mobile-row inventory-item__mobile-row--w20">
          <div className="inventory-item__mobile-column inventory-item__mobile-column--flex-full">
            <div className="inventory-item__flex">
              <div className="inventory-item__buttons">
                <img
                  onClick={() =>
                    props.onOpenDeleteModal(props.id, props.itemName)
                  }
                  role="button"
                  className="inventory-item__btn"
                  src={deleteIcon} alt="delete"
                />
                <Link to={`/inventory/${props.id}/edit`}>
                  <img className="inventory-item__btn" src={editIcon} alt="edit"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryItem;
