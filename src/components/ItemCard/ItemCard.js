import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardClick, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((likes) => likes === currentUser._id);
  const likeButtonClass = () => {
    return isLiked ? "card__like-button-active" : "card__like-button-inactive";
  };

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__name">{item.name}</p>
        {isLoggedIn ? (
          <button
            className={likeButtonClass}
            type="button"
            onClick={onCardClick}
          />
        ) : (
          <button className="card__like-button-hidden" />
        )}
      </div>
      <img
        src={item.link}
        className="card__image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
