import React from "react";
import avatar from "../../images/Avatar.svg";
import "./SideBar.css";
import { username } from "../../utils/constants";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img
        alt="sidebar__avatar"
        src={avatar}
        className="sidebar__avatar-picture"
      />
      <p className="sidebar__avatar-name">{username}</p>
    </div>
  );
};

export default SideBar;
