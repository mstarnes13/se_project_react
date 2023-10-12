import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import {
  getlocation,
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  deleteItems,
  getItems,
  postItems,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import { register, signIn, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleCreateModal = () => {
    setActiveModal("create");
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

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error(error.status);
      });
  }, []);

  const handleAddItemSubmit = (values) => {
    postItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCard = (cardElement) => {
    deleteItems(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== cardElement;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeClick = ({ _id, isLiked, user }) => {
    !isLiked
      ? addCardLike(_id)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((card) => (card._id === _id ? updatedCard.item : card))
            )
          )
          .catch((err) => console.error(err))
      : removeCardLike(_id)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((card) => (card._id === _id ? updatedCard.item : card))
            )
          )
          .catch((err) => console.error(err));
  };

  const handleRegistration = ({
    emailValue,
    passwordValue,
    nameValue,
    avatarValue,
  }) => {
    setIsLoading(true);
    register({
      email: emailValue,
      password: passwordValue,
      name: nameValue,
      avatar: avatarValue,
    })
      .then((userData) => {
        setLoggedIn(true);
        setUserData(userData);
        setCurrentUser(userData);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ emailValue, passwordValue }) => {
    setIsLoading(true);
    signIn({ email: emailValue, password: passwordValue })
      .then((userData) => {
        localStorage.setItem("jwt", userData.jwt);
        setToken(localStorage.getItem("jwt"));
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .then(() => handleCloseModal())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleEditProfile = (data) => {
    setIsLoading(true);
    editUserProfile(data)
      .then((res) => setCurrentUser(res))
      .then(() => handleCloseModal())
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const location = getlocation(data);
        setCity(location);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      checkToken(storedToken);
      setLoggedIn(true);
      setCurrentUser();
    } else {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      console.log("Token not found");
    }
  }, []);

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
          currentCity={city}
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
