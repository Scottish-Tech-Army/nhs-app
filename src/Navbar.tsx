import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ChecklistIcon } from "./icons/checklist.svg";

function Navbar() {
  return (
    <nav>
      <NavLink
        aria-label="storage area"
        to={"/"}
        className={({ isActive }) => (isActive ? "navicon active" : "navicon")}
      >
        <HomeIcon />
        <div>Storage Area</div>
      </NavLink>
      <NavLink
        aria-label="summary"
        to={"/summary"}
        className={({ isActive }) => (isActive ? "navicon active" : "navicon")}
      >
        <ChecklistIcon />
        <div>Summary</div>
      </NavLink>
    </nav>
  );
}

export default Navbar;
