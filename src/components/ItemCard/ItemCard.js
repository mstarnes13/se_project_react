import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// const ItemCard = ({ item, onSelectCard, onCardClick, isLoggedIn }) => {
//   const { currentUser } = useContext(CurrentUserContext);

//   const newItem = item.data ? item.data : item

//   console.log('item here: ', newItem)
//   const isLiked = newItem.likes.some((likes) => likes === currentUser._id);
//   const likeButtonClass = () => {
//     return isLiked ? "card__like-button-active" : "card__like-button-inactive";
//   };

//   return (
//     <div className="card">
//       <div className="card__info">
//         <p className="card__name">{newItem.name}</p>
//         {isLoggedIn ? (
//           <button
//             className={likeButtonClass}
//             type="button"
//             onClick={onCardClick}
//           />
//         ) : (
//           <button className="card__like-button-hidden" />
//         )}
//       </div>
//       <img
//         src={newItem.link}
//         className="card__image"
//         alt={newItem.name}
//         onClick={() => onSelectCard(newItem)}
//       />
//     </div>
//   );
// };

const ItemCard = ({ item, onSelectCard, onCardClick, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const cardId = item._id;
  console.log(item._id);
  const userId = currentUser ? currentUser._id : "";
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const likeButtonClass = isLiked
    ? "card__like-button"
    : "card__like-button card__like-button-inactive";

  const handleLikeClick = () => {
    onCardClick({ _id: cardId, isLiked: isLiked, user: userId });
    console.log(cardId, isLiked, userId);
  };

  return (
    <div className="card">
      <div className="card__info">
        <span className="card_name">{item.name}</span>
        {isLoggedIn ? (
          <button
            className={likeButtonClass}
            type="button"
            onClick={handleLikeClick}
          />
        ) : (
          <button className="card__like-button-hidden" />
        )}
      </div>
      <img
        src={item.imageUrl}
        className="card_image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
