import { Link } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import "./style.css"

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return(
    <header className="header">
      <nav className="navigate">
        <ul className="navigate_ul">
          <li>
            <Link to="/">Домашняя</Link>
          </li>
          <li>
            <Link to="/contacts">Контакты</Link>
          </li>
          <li id="user">
            {isAuthenticated ? (
              <div>
                <div>
                  <Link to="/profile">Личный кабинет</Link>
                  <button 
                    onClick={handleLogout} 
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">Авторизация</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}