import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, cityName }) => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/Logo.svg").default} alt="logo" />
        </div>
        <div className="header__location">
          {currentDate}, {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button className="nav__button" type="text" onClick={onCreateModal}>
            + Add New Clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={require("../../images/Avatar.svg").default} alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
