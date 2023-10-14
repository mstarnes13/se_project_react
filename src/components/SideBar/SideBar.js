import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ handleSignOut, handleEditModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : null;
  const name = currentUser ? currentUser.name : null;
  const history = useHistory();

  const signUserOut = () => {
    handleSignOut();
    history.push("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__container-info">
        <img className="sidebar__img" src={avatar} alt="avatar" />
        <h2 className="sidebar__title">{name}</h2>
      </div>
      <button className="sidebar__btn" type="button" onClick={handleEditModal}>
        Edit profile
      </button>
      <button className="sidebar__btn" type="button" onClick={signUserOut}>
        Log out
      </button>
    </div>
  );
};

export default SideBar;
