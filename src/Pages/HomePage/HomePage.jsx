import React, { useState } from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import Categories from "../../Components/Categories/Categories";
import Menu from "../../Components/Menu/Menu";
import Footer from "../../Components/Footer/Footer";
function HomePage() {
  const [category, setCategory] = useState("all");
  return (
    <>
      <Header />
      <Categories category={category} setCategory={setCategory} />
      <Menu category={category} />
    </>
  );
}

export default HomePage;
