import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignInAlt,
  faUserPlus,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../shared/Dropdown";
import { Menu, MenuItem } from "../shared/Menu";

const defaultNavItemClass = "h-full flex items-center px-2 hover:bg-yellow-600";
const selectedClass = "bg-yellow-800";

export const NavBar: React.FC = () => {
  let location = useLocation();

  const links: Array<{ name: string; path: string }> = [
    { name: "Main page", path: "/" },
    { name: "Game rules", path: "/game-rules" },
    { name: "About us", path: "/about-us" },
  ];

  const menu = (
    <Menu>
      <Link to="/sign-in">
        <MenuItem icon={faSignInAlt}>Sign In</MenuItem>
      </Link>
      <Link to="/sign-up">
        <MenuItem icon={faUserPlus}>Sign Up</MenuItem>
      </Link>
      <hr />
      <MenuItem icon={faQuestionCircle}>Help</MenuItem>
    </Menu>
  );

  return (
    <div className="w-full h-12 bg-yellow-500 px-10 flex items-center text-white justify-between">
      <div className={"text-3xl cursor-pointer " + defaultNavItemClass}>
        CODENAMES
      </div>
      <div className="h-full flex">
        {links.map((link) => (
          <Link
            key={link.path}
            className={
              defaultNavItemClass +
              (location.pathname === link.path ? " " + selectedClass : "")
            }
            to={link.path}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className={"text-3xl cursor-pointer " + defaultNavItemClass}>
        <Dropdown triggers={["hover"]} menu={menu}>
          <FontAwesomeIcon icon={faUserCircle} />
        </Dropdown>
      </div>
    </div>
  );
};
