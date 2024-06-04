import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import LoginPopUp from "./Components/LoginPopup/LoginPopup";
import useLocalStorage from "./hooks/useLocalStorage";
import Checkout from "./Pages/Checkout/Checkout";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isUserLoggedIn } = useLocalStorage();
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
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
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
