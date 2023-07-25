import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <p className="card__name">{item.name}</p>
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
