import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;
  const deleteButtonClass = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        ></img>
        <div className="modal__info">
          <p className="modal__title">{selectedCard.name}</p>
          <div className="modal__weather-type">
            Weather Type: {selectedCard.weather}
          </div>
          <button
            className="modal__button-delete"
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
