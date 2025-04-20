import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { removeToken } from "../../utils/token";

function Header({ email, setEmail, setIsLoggedIn }) {
  const [action, setAction] = useState("");
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
      setEmail("");
      navigate("/login");
      setIsLoggedIn(false);
    }
    if (action == "Regístrate") navigate("/signup");
    if (action == "Iniciar sesión") navigate("/signin");
  };

  return (
    <>
      <header className="header">
        <div className="header__content">
          <img
            src={logo}
            alt="Logo Alrededor de los Estados Unidos"
            className="header__logo"
          />
          <div className="header__text">
            <span className="header__user">{email}</span>
            <span className="header__action" onClick={handleAction}>
              {action}
            </span>
          </div>
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}

export default Header;
