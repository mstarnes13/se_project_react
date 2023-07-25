import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
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
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
