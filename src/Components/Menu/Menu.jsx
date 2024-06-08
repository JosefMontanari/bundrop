import React, { useEffect, useState } from "react";
import "./Menu.css";
import FoodItem from "../FoodItem/FoodItem";
import useLocalStorage from "../../hooks/useLocalStorage";

function Menu({ category }) {
  const { isUserLoggedIn } = useLocalStorage();
  const [foodList, setFoodList] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function updateUserFavorites(favoritesList) {
    const updatedUser = { ...loggedInUser, favorites: favoritesList };

    // Uppdatera state
    setLoggedInUser(updatedUser);

    // Uppdatera localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Uppdatera server
    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };
    fetch(`http://localhost:3001/users/${loggedInUser.id}`, putOptions);
  }

  async function addToFavorites(item) {
    const newFoodList = [...userFavorites, item];
    setUserFavorites(newFoodList);
  }

  async function removeFromFavorites(id) {
    const newFoodList = userFavorites.filter((f) => f.id !== id);
    setUserFavorites(newFoodList);
  }

  // async function getUserFavorites() {
  //   if (loggedInUser) {
  //     return loggedInUser.favorites || [];
  //   }
  //   return [];
  // }

  async function allCategoriesSelected() {
    let allFoodData = [];
    const endpoints = ["hamburgers", "drinks", "sides", "wings"];
    for (const endpoint of endpoints) {
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      const data = await response.json();
      allFoodData = allFoodData.concat(data);
    }
    return allFoodData;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setUserFavorites(user.favorites || []);
    }
  }, []);

  useEffect(() => {
    allCategoriesSelected().then((data) => setFoodList(data));
  }, []);

  useEffect(() => {
    if (category !== "all") {
      fetch(`http://localhost:3000/${category}`)
        .then((res) => res.json())
        .then((data) => setFoodList(data));
    } else {
      allCategoriesSelected().then((data) => setFoodList(data));
    }
  }, [category]);

  // Uppdatera sidan dynamiskt varje gång favorites ändras
  useEffect(() => {
    if (loggedInUser) {
      updateUserFavorites(userFavorites);
    }
  }, [userFavorites]);

  return (
    <div className="menu-container" id="menu-container">
      <div className="menu-list">
        {foodList.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              isFavorite={userFavorites.some((c) => c.id === item.id)}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
