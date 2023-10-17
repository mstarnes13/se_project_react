import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  onCreateModal,
  location,
  onClickSignUp,
  onClickLogin,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { avatar, name } = currentUser;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__location">
          {currentDate}, {location}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__nav">
            <button className="nav__button" type="text" onClick={onCreateModal}>
              + Add New Clothes
            </button>
            <Link to="/profile" className="nav__name">
              {name}
            </Link>
            <Link to="profile" className="header__avatar">
              <img className="header__avatar" src={avatar} alt="avatar" />
            </Link>
          </div>
        ) : (
          <div className="header__avatar-logo">
            <button className="header__button" onClick={onClickSignUp}>
              Sign Up
            </button>
            <button className="header__button" onClick={onClickLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
