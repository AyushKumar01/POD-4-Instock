import React from "react";
import CloseBtn from "../../assets/icons/close-24px.svg";

const DeleteInventoryItem = ({
  onDelete,
  currentItemName,
  onCloseDeleteModal,
}) => {
  return (
    <div className="delete-popup">
      <img
        onClick={onCloseDeleteModal}
        className="delete-popup__close"
        src={CloseBtn} alt="close"
      />
      <div className="delete-popup__text-container">
        <h1 className="delete-popup__title">
          Delete <span>{currentItemName}</span> inventory item?
        </h1>
        <h6 className="delete-popup__text">
          Please confirm that you’d like to delete the{" "}
          <span>{currentItemName}</span> from the inventory list. You won’t be
          able to undo this action.
        </h6>
      </div>
      <div className="delete-popup__btn-container">
        <button
          onClick={onCloseDeleteModal}
          className="delete-popup__cancel-button"
        >
          Cancel
        </button>
        <button onClick={onDelete} className="delete-popup__delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteInventoryItem;
