import React from "react";
import { NavLink } from "react-router-dom";
import { SignOut } from "./auth/SignOut";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ChecklistIcon } from "./icons/checklist.svg";
// Icon SVGs downloaded from https://fonts.google.com/icons?icon.style=Filled&icon.set=Material+Icons under Apache licence

function Navbar() {
  return (
    <nav>
      <NavLink
        aria-label="directory"
        to={"/"}
        className={({ isActive }) => (isActive ? "navicon active" : "navicon")}
      >
        <HomeIcon />
        <div>Directory</div>
      </NavLink>
      <NavLink
        aria-label="missing-items"
        to={"/missing-items"}
        className={({ isActive }) => (isActive ? "navicon active" : "navicon")}
      >
        <ChecklistIcon />
        <div>Missing Items</div>
      </NavLink>
      <SignOut />
    </nav>
  );
}

export default Navbar;
