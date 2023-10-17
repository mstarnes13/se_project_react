import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, handleAddItemSubmit, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");
  const handleWeatherType = (e) => {
    console.log(e.target.value);
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__form">
        <label className="modal__label">
          Name
          <input
            className="modal__input-name"
            type="text"
            name="name"
            minLength="1"
            maxLength="300"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input-name"
            type="url"
            name="imageUrl"
            minLength="1"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <div>
        <p className="modal__label">Select the Weather Type</p>
        <div className="weather__selections">
          <div>
            {" "}
            <input
              className="form__input"
              type="radio"
              id="hot"
              value="hot"
              name="weather"
              onChange={handleWeatherType}
            />
            <label>
              <span>Hot</span>
            </label>
          </div>
          <div>
            {" "}
            <input
              className="form__input"
              type="radio"
              id="warm"
              value="warm"
              name="weather"
              onChange={handleWeatherType}
            />
            <label>Warm</label>
          </div>
          <div>
            {" "}
            <input
              className="form__input"
              type="radio"
              id="cold"
              value="cold"
              name="weather"
              onChange={handleWeatherType}
            />
            <label>Cold</label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
