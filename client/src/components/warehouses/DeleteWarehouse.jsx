import React from "react";
import CloseBtn from "../../assets/icons/close-24px.svg";

const DeleteWarehouse = ({
  onDelete,
  currentItemName,
  onCloseDeleteModal,
}) => {
  return (
    <div className="delete-popup">
      <img className="delete-popup__close" alt="close" src={CloseBtn} onClick={onCloseDeleteModal}/>
      <div className="delete-popup__text-container">
        <h1 className="delete-popup__title">
          Delete <span>{currentItemName}</span> warehouse?
        </h1>
        <h6 className="delete-popup__text">
          Please confirm that you’d like to delete the {" "}
        <span>{currentItemName}</span> from the list of warehouses. You won’t be able 
        to undo this action.
        </h6>
      </div>
      <div className="delete-popup__btn-container">
        <button className="delete-popup__cancel-button" onClick={onCloseDeleteModal}>Cancel</button>
        <button className="delete-popup__delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteWarehouse;
