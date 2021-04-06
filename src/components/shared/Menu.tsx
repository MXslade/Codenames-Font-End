import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const Menu: React.FC = (props) => {
  return (
    <div className="text-base flex flex-col bg-yellow-500 border shadow-md rounded-md py-2">
      <ul>{props.children}</ul>
    </div>
  );
};

interface MenuItemProps {
  icon?: IconProp;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon } = props;

  return (
    <li className="capitalize hover:bg-yellow-600 px-4 py-2 flex items-center">
      {icon && (
        <div className="w-10 flex items-center">
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>
      )}
      {props.children}
    </li>
  );
};
