import { useState } from "react";
import Title from "./title";
import menu from "./data.js";
import Menu from "./menu.jsx";
import Categories from "./categories.jsx";

const tempCategories = menu.map((item) => item.category);
const tempSet = new Set(tempCategories);
const allCategories = ['all', ...tempSet];

const App = () => {
  const [menuItems,setMenuItems] = useState(menu);
  const [categories,setCategories] = useState(allCategories);
  const filterItems = (category) => {
    if (category === 'all') {
      return setMenuItems(menu);
    } 
    const newItems = menu.filter((item) => item.category === category);
    setMenuItems(newItems);
  }
  return (
    <main>
      <section className="menu">
        <Title text="our menu" />
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};
export default App;
