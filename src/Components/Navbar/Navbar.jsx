import React, { useState, useEffect } from "react";
import "./Navbar.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

function Navbar({ setIsLoggedIn, setShowLogin, isLoggedIn, setShowFavorites }) {
  const [menu, setMenu] = useState("home");

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  }

  return (
    <div className="navbar">
      <div className="navbar-content-left">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <img src="/logo-black.png" alt="Burger bun" />
        </Link>
      </div>
      <div className="navbar-content-center">
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#categories"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("about-us")}
            className={menu === "about-us" ? "active" : ""}
          >
            About Us
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            Contact
          </a>
        </ul>
      </div>
      <div className="navbar-content-right">
        {isLoggedIn ? (
          <div className="navbar-favorite-container">
            <a onClick={() => setShowFavorites(true)}>
              <img src="/heart-fill.svg" alt="" />
            </a>
          </div>
        ) : (
          <></>
        )}

        <div className="navbar-cart-container">
          <Link to="/cart">
            <img className="cart-img" src="/cart-fill.svg" alt="Cart" />
          </Link>
        </div>
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>
            <img className="lock-img" src="/lock-fill.svg" alt="Login" />
            Sign in
          </button>
        ) : (
          <button onClick={handleLogout} className="log-out-button">
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
