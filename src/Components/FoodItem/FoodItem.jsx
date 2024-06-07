import React, { useEffect, useState } from "react";
import "./FoodItem.css";
import useLocalStorage from "../../hooks/useLocalStorage";
function FoodItem({ id, name, price, description, image }) {
  const { isUserLoggedIn, getCart, addToCart, removeFromCart } =
    useLocalStorage();
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(loggedInUser);
    setCartItems(getCart());
  }, []);

  function handleRemoveFromCart() {
    removeFromCart(id);
    setCartItems(getCart());
  }

  function handleAddToCart() {
    addToCart({ id, name, price, description, image });
    setCartItems(getCart());
  }

  return (
    <div className="food-item">
      <div className="food-item-image">
        <img src={image} alt="" />

        {/* {isUserLoggedIn() ? (
          favorites.some((f) => f.id === id) ? (
            <img
              className="heart"
              src="/heart-fill.svg"
              alt=""
              onClick={() => removeFromFavorites(id)}
            />
          ) : (
            <img
              className="heart"
              src="/heart.svg"
              alt=""
              onClick={() => addToFavorites({ id, name, price, image })}
            />
          )
        ) : (
          <></>
        )} */}

        {!cartItems.find((c) => c.id === id) ? (
          <img
            onClick={() => handleAddToCart()}
            className="add"
            src="/add_icon_white.png"
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => handleRemoveFromCart(id)}
              src="/remove_icon_red.png"
              alt=""
            />
            <p>{cartItems.find((c) => c.id === id).quantity}</p>
            <img
              onClick={() => handleAddToCart()}
              src="/add_icon_green.png"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
