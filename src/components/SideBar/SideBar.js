import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./SideBar.css";


const SideBar = ({onSignOut, onOpenEditProfileModal}) => {
  const currentUser = useContext(CurrentUserContext);
  const Avatar = currentUser ? currentUser.avatar : null;
  const Name = currentUser ? currentUser.name : null;
  const history = useHistory();
  
  const signUserOut = () => {
    onSignOut();
    history.push("/");
  };
  const showAvatar = Avatar !== "" ? true : false;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="sidebar">
      <img
        alt="Avatar"
        src={Avatar}
        className="sidebar__avatar-picture"
      />
      <p className="sidebar__avatar-name">{Name}</p>
      <div className="sidebar__container-buttons">
        <button className="side__container-button" type="button"  onClick={onOpenEditProfileModal}>
          Change profile data
        </button>
        <button className="side__container-button" type="button" onClick={signUserOut}>
          Log out
        </button>
      </div>
      
    </div>
  );
};

export default SideBar;