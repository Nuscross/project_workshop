import { Link } from "react-router-dom";
import { FaBars, FaHome, FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import MenuData from "../MenuData";
import "./Navigation.css";

const Navigation = () => {

  const [showMenu,setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <aside>
      <div className="navbar">
        <div className="navbar-toggle">
          <Link to="#" className="menu-bar">
            <FaBars onClick={toggleMenu} />
          </Link>
        </div>
      </div>
      <nav className={showMenu ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-item" onClick={toggleMenu}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bar">
              <FaWindowClose />
            </Link>
          </li>
          {MenuData.map((menu)=>{
            const { title, path, icon } = menu;
            return (
              <li key={title} className="menu-text">
                <Link to={path}>
                  {icon}
                  <span>{title} </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )

}

export default Navigation;