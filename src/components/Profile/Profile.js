import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  handleEditModal,
  handleSignOut,
  handleLikeClick,
  isLoggedIn,
}) => {
  return (
    <div className="profile">
      <SideBar
        handleEditModal={handleEditModal}
        handleSignOut={handleSignOut}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        clothingItems={clothingItems}
        handleLikeClick={handleLikeClick}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
