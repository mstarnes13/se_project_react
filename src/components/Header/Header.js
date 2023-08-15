import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, cityName }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__location">
          {currentDate}, {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button className="nav__button" type="text" onClick={onCreateModal}>
            + Add New Clothes
          </button>
        </div>
        <Link to="/profile" className="nav__name">
          Michelle Starnes
        </Link>
        <div>
          <img src={avatar} alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
