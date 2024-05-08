import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import RootStore from "../../stores/root.store";
import "./Header.css";

interface HeaderProps {
  rootStore: typeof RootStore;
}

const Header: React.FC<HeaderProps> = observer(({ rootStore }) => {
  const navigate = useNavigate()
  const isLoggedIn = rootStore.authStore.isLoggedIn;
  const user = rootStore.authStore.user;
  
  const handleLogout = () => {
    rootStore.clearSession();
    rootStore.authStore.logout();
    navigate('/signin')
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/users/${user?.id}/cart`} className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header >
  );
});

export default Header;
