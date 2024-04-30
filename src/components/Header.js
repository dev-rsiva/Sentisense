import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LogoContainer from "./titleGenerator/LogoContainer";
const Header = () => {
  return (
    <div className="bg-[#0D111B] w-full py-2 text-white font-Rubik shadow-lg">
      <div className="px-3 sm:px-20 w-full flex justify-between items-center">
        <div className="flex items-center">
          <LogoContainer />
          <div className="font-semibold text-xs sm:text-sm">
            <ul className="flex">
              <li className="mr-4">
                AI Tools
                <span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-1 textxs sm:text-sm"
                  />
                </span>
              </li>
              <li>Pricing</li>
            </ul>
          </div>
        </div>

        <div className="font-bold text-xs sm:text-2xl ">
          <button className="bg-[#139DFF] rounded-full px-5 py-2 text-sm">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
