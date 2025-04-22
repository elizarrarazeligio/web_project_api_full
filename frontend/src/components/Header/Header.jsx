import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import menuIcon from "../../assets/images/menu.png";
import { useEffect, useState } from "react";
import { removeToken } from "../../utils/token";

function Header({ currentUser, setCurrentUser, setIsLoggedIn }) {
  const [action, setAction] = useState("");
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/signin") setAction("Regístrate");
    else if (location.pathname == "/signup") setAction("Iniciar sesión");
    else setAction("Cerrar sesión");
  }, [location]);

  const handleAction = () => {
    if (action == "Cerrar sesión") {
      removeToken();
      setCurrentUser({});
      setMenu(false);
      navigate("/login");
      setIsLoggedIn(false);
    }
    if (action == "Regístrate") navigate("/signup");
    if (action == "Iniciar sesión") navigate("/signin");
  };

  return (
    <>
      <header className="header">
        {currentUser.email ? (
          <div
            className={`header__menu_adaptable ${
              menu ? "header__menu_active" : "header__menu_inactive"
            }`}
          >
            <span className="header__user">{currentUser.email}</span>
            <span className="header__action" onClick={handleAction}>
              {action}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="header__content">
          <img
            src={logo}
            alt="Logo Alrededor de los Estados Unidos"
            className="header__logo"
          />
          {currentUser.email ? (
            <>
              <div className="header__menu header__menu_invisible">
                <span className="header__user">{currentUser.email}</span>
                <span className="header__action" onClick={handleAction}>
                  {action}
                </span>
              </div>
              <img
                className="header__menu-icon"
                src={menuIcon}
                alt="Menú para cierre de sesión"
                onClick={() => setMenu(!menu)}
              />
            </>
          ) : (
            <div className="header__menu">
              <span className="header__action" onClick={handleAction}>
                {action}
              </span>
            </div>
          )}
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}

export default Header;
