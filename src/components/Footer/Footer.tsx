import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {
  faVk,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const defaultFooterIconClass = "mx-4 text-3xl hover:text-gray-300";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="flex bg-pink-700 text-white items-center justify-center py-4">
        Here I am gonna list all languages
      </div>
      <div className="flex bg-pink-900 text-white items-center justify-center py-4">
        <button className="bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800 mx-4">
          Subscribe for news
        </button>
        <FontAwesomeIcon icon={faVk} className={defaultFooterIconClass} />
        <FontAwesomeIcon icon={faTelegram} className={defaultFooterIconClass} />
        <FontAwesomeIcon icon={faDiscord} className={defaultFooterIconClass} />
      </div>
    </>
  );
};
