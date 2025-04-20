import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Popup from "./Main/Popup/Popup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import errorIcon from "../assets/images/error.png";
import successIcon from "../assets/images/confirm.png";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const successPopup = {
    title: true,
    children: (
      <InfoTooltip
        advertise="¡Correcto! Ya estás registrado."
        icon={successIcon}
      />
    ),
  };

  const errorPopup = {
    title: true,
    children: (
      <InfoTooltip
        advertise="Uy, algo salió mal. Por favor, inténtalo de nuevo."
        icon={errorIcon}
      />
    ),
  };

  // Efecto para renderizar información de usuario al montar App
  useEffect(() => {
    api.getUserInfo().then((data) => setCurrentUser(data));
  }, []);

  // Efecto para renderizar tarjetas al montar App
  useEffect(() => {
    api.getInitialCards().then((data) => setCards(data));
  }, []);

  // Efecto para verificar token al montar App
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    auth.getUserInfo(jwt).then(({ data }) => {
      setIsLoggedIn(true);
      setEmail(data.email);
    });
  }, []);

  // Función para abrir Popup
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Función para cerrar Popup
  function handleClosePopup() {
    setPopup(null);
  }

  // Función para editar información de usuario
  const handleUpdateUser = (data) => {
    (async () => {
      await api.editUserInfo(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  // Función para cambiar foto de perfil de usuario
  const handleUpdateAvatar = (avatar) => {
    (async () => {
      await api.changeProfilePicture(avatar).then((newAvatar) => {
        setCurrentUser(newAvatar);
        handleClosePopup();
      });
    })();
  };

  // Función para añadir nueva tarjeta
  const handleAddCardSubmit = (data) => {
    (async () => {
      await api.addNewCard(data.name, data.link).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  // Función para manejo de Likes
  async function handleCardLike(card, isLiked) {
    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  // Función para borrar Cards
  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((deletedCard) => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== deletedCard._id)
        );
      })
      .catch((error) => console.error(error));
  }

  // Función para manejo de Registro
  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        navigate("/signin");
        handleOpenPopup(successPopup);
      })
      .catch(() => {
        console.error;
        handleOpenPopup(errorPopup);
      });
  };

  // Función para manejo de Login
  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setEmail(email);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddCardSubmit,
        }}
      >
        <Header
          email={email}
          setIsLoggedIn={setIsLoggedIn}
          setEmail={setEmail}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  onOpenPopup={handleOpenPopup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register handleRegister={handleRegister} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        <Footer />

        {/* Evaluando hook para abrir Popups */}
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
