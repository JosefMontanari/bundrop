import React from "react";
import "./Categories.css";
function Categories({ category, setCategory }) {
  return (
    <div className="categories-container" id="categories">
      <div
        className="category-item"
        onClick={() =>
          setCategory((prev) => (prev === "hamburgers" ? "all" : "hamburgers"))
        }
      >
        <img
          src="/burgers-cat.png"
          alt=""
          className={category === "hamburgers" ? "active-category" : ""}
        />
      </div>

      <div
        className="category-item"
        onClick={() =>
          setCategory((prev) => (prev === "sides" ? "all" : "sides"))
        }
      >
        <img
          src="/sides-cat.png"
          alt=""
          className={category === "sides" ? "active-category" : ""}
        />
      </div>

      <div
        onClick={() =>
          setCategory((prev) => (prev === "drinks" ? "all" : "drinks"))
        }
        className="category-item"
      >
        <img
          src="drinks-cat.png"
          className={category === "drinks" ? "active-category" : ""}
          alt=""
        />
      </div>
      <div
        onClick={() =>
          setCategory((prev) => (prev === "wings" ? "all" : "wings"))
        }
        className="category-item"
      >
        <img
          src="wings-cat.png"
          alt=""
          className={category === "wings" ? "active-category" : ""}
        />
      </div>
    </div>
  );
}

export default Categories;
