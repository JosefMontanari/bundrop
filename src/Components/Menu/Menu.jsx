import React, { useEffect, useState } from "react";
import "./Menu.css";
import FoodItem from "../FoodItem/FoodItem";
import useLocalStorage from "../../hooks/useLocalStorage";
function Menu({ category }) {
  const [foodList, setFoodList] = useState([]);

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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
