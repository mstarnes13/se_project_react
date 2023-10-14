import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getlocation,
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi";
import {
  deleteItems,
  getItems,
  postItems,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import { register, signIn, checkToken } from "../../utils/auth";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [location, setLocation] = useState("Current Location");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleLogInModal = () => {
    setActiveModal("login");
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleAddItemSubmit = (values) => {
    postItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteCard = (cardElement) => {
    deleteItems(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter(
          (card) => card.id !== cardElement
        );
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLikeClick = ({ _id, isLiked }) => {
    const likeAction = isLiked ? removeCardLike : addCardLike;
    likeAction(_id)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === _id ? updatedCard.item : card))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleRegistration = ({ email, password, nameValue, avatarValue }) => {
    register({
      email: email,
      password: password,
      name: nameValue,
      avatar: avatarValue,
    })
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    signIn({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setCurrentUser(data);
          handleCloseModal();
          history.push("/profile");
        } else {
          console.error("Login Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProfile = (data) => {
    setIsLoading(true);
    editUserProfile(data)
      .then((res) => setCurrentUser(res))
      .then(() => handleCloseModal())
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const location = getlocation(data);
        setLocation(location);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token).then((data) => {
        setCurrentUser(data.user);
        setLoggedIn(true);
      });
    } else {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      console.log("Token not found");
    }
  }, [isLoggedIn, history]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header
          isLoggedIn={isLoggedIn}
          onCreateModal={handleCreateModal}
          onSignUp={handleSignUpModal}
          onLoginModal={handleLogInModal}
          temp={temp}
          user={currentUser}
          location={location}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              onCardLike={handleLikeClick}
              isLoggedIn={isLoggedIn}
            />
          </Route>

          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Route path="/profile">
              <Profile
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                onEditProfile={handleEditProfile}
                onCardLike={handleLikeClick}
                onSignOut={handleLogout}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                onEditProfileModal={handleEditProfileModal}
              />
            </Route>
          </ProtectedRoute>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            handleAddItemSubmit={handleAddItemSubmit}
            isOpen={activeModal === "create"}
            isLoading={isLoading}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
        {activeModal === "signup" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "signup"}
            handleRegistration={handleRegistration}
            onLoginModal={handleLogInModal}
            isLoading={isLoading}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            onSignUp={handleSignUpModal}
            isLoading={isLoading}
          />
        )}

        {activeModal === "edit" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "edit"}
            currentUser={currentUser}
            isLoading={isLoading}
            onClickEditModal={handleLogInModal}
            onSubmit={handleEditProfile}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
