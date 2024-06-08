import React, { useState, useEffect } from "react";
import "./FavoritesPopup.css";
import useLocalStorage from "../../hooks/useLocalStorage";

function FavoritesPopup({ setShowFavorites }) {
  const { getCart, addToCart, removeFromCart } = useLocalStorage();
  const [userFavorites, setUserFavorites] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  function handleCloseWindow() {
    // setShowFavorites(false);
    window.location.reload();
  }

  function handleAddToCart({ item }) {
    addToCart(item);
    setCartItems(getCart());
  }

  function handleRemoveFromCart(id) {
    removeFromCart(id);
    setCartItems(getCart());
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setUserFavorites(user.favorites || []);
      setCartItems(getCart());
    }
  }, []);
  return (
    <div className="favorites-window">
      <div className="favorites-container">
        <div className="favorites-header">
          <h2>Your favorites</h2>
          <a onClick={() => handleCloseWindow()}>X</a>
        </div>

        <div className="favorites-content">
          <hr />
          <ul>
            {userFavorites.map((item, index) => (
              <li key={index}>
                <div className="favorite-item-content">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  {!cartItems.find((c) => c.id === item.id) ? (
                    <div className="add-favorites">
                      <img
                        onClick={() => handleAddToCart({ item })}
                        src="/add_icon_white.png"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="food-item-counter-favorites">
                      <img
                        onClick={() => handleRemoveFromCart(item.id)}
                        src="/remove_icon_red.png"
                        alt=""
                      />
                      <p>{cartItems.find((c) => c.id === item.id).quantity}</p>
                      <img
                        onClick={() => handleAddToCart({ item })}
                        src="/add_icon_green.png"
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPopup;
