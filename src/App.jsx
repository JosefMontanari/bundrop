import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import LoginPopUp from "./Components/LoginPopup/LoginPopup";
import useLocalStorage from "./hooks/useLocalStorage";
import Checkout from "./Pages/Checkout/Checkout";
import FavoritesPopup from "./Components/FavoritesPopup/FavoritesPopup";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isUserLoggedIn } = useLocalStorage();
  const [showFavorites, setShowFavorites] = useState(false);
  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, [isUserLoggedIn, setIsLoggedIn, isLoggedIn]);
  return (
    <>
      {showLogin ? (
        <LoginPopUp setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
      ) : (
        <></>
      )}
      {showFavorites ? (
        <FavoritesPopup setShowFavorites={setShowFavorites}></FavoritesPopup>
      ) : (
        <></>
      )}
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
        setShowFavorites={setShowFavorites}
      ></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
