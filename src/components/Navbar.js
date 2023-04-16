import "./navbar.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { MdNightlight } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";
import Data from "./Data";
import { useState } from "react";

const Navbar = ({ length }) => {
  const [bool, setBool] = useState(false);
  // const [cartquantity, setCartquantity] = useState(0);

  const darkmode = () => {
    if (bool) setBool(false);
    else setBool(true);
  };

  return (
    <>
      <div className="navbar">
        <div className="inside_navbar" style={{ display: "flex" }}>
          <Link style={{ textDecoration: "none" }} className="heading" to="/">
            T-Shirt Store
          </Link>
          <div className="logo">
            <div className="for_state_change">
              <Link to="/cart">
                <BsFillCartCheckFill className="cart_logo" />
              </Link>
              <p>{length}</p>
            </div>
            {bool ? (
              <MdNightlight onClick={darkmode} className="toggle_darkmode" />
            ) : (
              <MdOutlineModeNight
                onClick={darkmode}
                className="toggle_darkmode"
              />
            )}
          </div>
        </div>
        <hr className="line_insidenavbar" />
      </div>
    </>
  );
};

export default Navbar;
