import React, { useEffect, useState } from "react";
import "./FoodItem.css";
import useLocalStorage from "../../hooks/useLocalStorage";
function FoodItem({ id, name, price, description, image }) {
  const { isUserLoggedIn, getCart, addToCart, removeFromCart } =
    useLocalStorage();
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function getFavorites() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    fetch(`http://localhost:3001/users/${loggedInUser.id}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data.favorites))
      .catch((err) => console.error("Failed to fetch favorites:", err));
  }

  function updateFavorites(newFavorites) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const postOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorites: newFavorites }),
    };

    return fetch(`http://localhost:3001/users/${loggedInUser.id}`, postOptions)
      .then((res) => res.json())
      .then(() => setFavorites(newFavorites))
      .catch((err) => console.error("Failed to update favorites:", err));
  }

  async function addToFavorites(foodItem) {
    const updatedFavorites = [...favorites, foodItem];
    await updateFavorites(updatedFavorites);
  }

  async function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    await updateFavorites(updatedFavorites);
  }

  function handleRemoveFromCart() {
    removeFromCart(id);
    setCartItems(getCart());
  }

  function handleAddToCart() {
    addToCart({ id, name, price, description, image });
    getFavorites();
    setCartItems(getCart());
  }

  useEffect(() => {
    setCartItems(getCart());
    getFavorites();
  }, []);

  return (
    <div className="food-item">
      <div className="food-item-image">
        <img src={image} alt="" />

        {isUserLoggedIn() ? (
          favorites.find((f) => f.id === id) ? (
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
              onClick={() =>
                addToFavorites({ id, name, description, price, image })
              }
            />
          )
        ) : (
          <></>
        )}

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
