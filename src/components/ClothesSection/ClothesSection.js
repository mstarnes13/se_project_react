import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

const ClothesSection = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser?._id;

  // console.log('clothingItems: ', clothingItems)
  const serverCards = clothingItems.filter((onSelectCard) => {
    return onSelectCard.owner === userId;
  });


  return (
    <div className="clothes__section">
      <div className="clothes__section-title-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button
          type="submit"
          className="clothes__section-button"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothing__section-cards">
        {serverCards.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={onSelectCard}
            isLoggedIn={isLoggedIn}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
