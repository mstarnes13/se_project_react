import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
  console.log("item modal");
  const userContext = useContext(CurrentUserContext);
  const userData = userContext ? userContext : { name: "n/a", avatar: "" };
  const isOwn = selectedCard.owner.id === userData.id;

  const modalDeleteClass = `modal__button-delete ${
    isOwn ? "modal__button-delete_visible" : "modal__button-delete_hidden"
  }`;
  
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        ></img>
        <div className="modal__info">
          <div className="modal__title">{selectedCard.name}</div>
          <div className="modal__weather-type">
            Weather Type: {selectedCard.weather}
          </div>
          <button
            className={modalDeleteClass}
            type="button"
            onClick={() => handleDeleteCard(selectedCard.id)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
