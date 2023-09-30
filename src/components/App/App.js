import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import {
  getCityName,
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { deleteItems, getItems, postItems } from "../../utils/Api";
import { register, signIn, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginInModal from "../LoginModal/LoginModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const appContextVaue = { state: { loggedIn, userData } };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleLogInModal = () => {
    setActiveModal("login");
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
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
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

  const handleRegistration = () => {
    const { email, password, name, avatar } = this.state;
    register(email, password, name, avatar)
      .then(() => {
        this.setState({
          loggedIn: true,
        });
        setLoggedIn();
        setUserData();
        setCurrentUser();
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (email, password) => {
    signIn(email, password)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          setLoggedIn(true);
          setCurrentUser();
          handleCloseModal();
        } else {
          console.error("Login failed.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const cityName = getCityName(data);
        setCity(cityName);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token);
      setIsLoggedIn(true);
      setCurrentUser();
    } else {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      console.log("Token not found");
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser} loggedIn={loggedIn}>
        <AppContextValue.Provider value={appContextValue}>
          {loggedIn ? (
            <Header
              onCreateModal={handleCreateModal}
              temp={temp}
              user={currentUser}
            />
          ) : (
            <UnAuthHeader
              onClickSignUp={openSignUpModal}
              OnClickLogIn={openLogInModal}
              temp={temp}
            />
          )}
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
              ></Profile>
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              handleAddItemSubmit={handleAddItemSubmit}
              isOpen={activeModal === "create"}
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
              OnClickLogIn={openLogInModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              onClickSignUp={openSignUpModal}
            />
          )}
        </AppContextValue.Provider>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
