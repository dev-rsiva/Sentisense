import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LogoContainer from "./titleGenerator/LogoContainer";
import { auth } from "../utils/firebase.js";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { dataContext } from "../utils/dataContext";
import { TOOLS_OVERVIEW } from "../utils/constants";
import { Link } from "react-router-dom";
const Header = ({ fromLandingPage }) => {
  const [showToolsList, setShowToolsList] = useState(false);
  console.log(fromLandingPage);
  const {
    user,
    setUser,
    isUserAuthenticated,
    setIsUserAuthenticated,
    isSignInForm,
    setIsSignInForm,
  } = useContext(dataContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    if (isUserAuthenticated) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setIsUserAuthenticated(false);
          // setIsLoading(false);
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  return (
    <div className="bg-[#0D111B] w-full py-2 text-white font-Rubik shadow-lg">
      <div className="px-3 sm:px-20 w-full flex justify-between items-center">
        <div className="flex items-center">
          <LogoContainer />
          <div className="font-semibold text-xs sm:text-sm">
            <ul className="flex">
              <li
                className="mr-4 relative cursor-pointer"
                onClick={() => setShowToolsList(!showToolsList)}
              >
                AI Tools
                {showToolsList && (
                  <ul className="flex flex-col absolute left-0 top-8 text-blue-900 bg-white rounded-md w-[200px] sm:w-[320px]">
                    {TOOLS_OVERVIEW.map((each, index) => {
                      return (
                        <Link to={each.link}>
                          <li
                            className={`px-2 sm:px-3 pt-2 py-1 sm:py-3 text-xs sm:text-sm hover:bg-slate-200 ${
                              index === 0 && "rounded-t-md"
                            } ${
                              index === TOOLS_OVERVIEW.length - 1 &&
                              "rounded-b-md"
                            } ${index > 2 && "cursor-not-allowed"}`}
                          >
                            {each.title}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
                <span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-1 text-xs sm:text-sm"
                  />
                </span>
              </li>
              <li className="hidden sm:block cursor-not-allowed">Pricing</li>
            </ul>
          </div>
        </div>
        {!isUserAuthenticated && !fromLandingPage && (
          <div className="font-bold text-xs sm:text-2xl ">
            <span className="text-xs sm:text-sm mr-2 sm:mr-4">
              {isSignInForm ? "New User ?" : "Already Registered ?"}
            </span>
            <button
              className="bg-[#139DFF] rounded-full p-2 sm:px-5 sm:py-2 text-xs sm:text-sm"
              onClick={() => setIsSignInForm(!isSignInForm)}
            >
              {isSignInForm ? "Sign up" : "Sign in"}
            </button>
          </div>
        )}
        {!isUserAuthenticated && fromLandingPage && (
          <div className="font-bold text-xs sm:text-2xl ">
            <span className="text-xs sm:text-sm mr-2 sm:mr-4">New User ?</span>
            <button
              className="bg-[#139DFF] rounded-full p-2 sm:px-5 sm:py-2 text-xs sm:text-sm"
              onClick={() => {
                setIsSignInForm(false);
                navigate("/login");
              }}
            >
              Sign up
            </button>
          </div>
        )}

        {isUserAuthenticated && (
          <div className="flex items-center text-sm text-white font-semibold">
            <span className="text-xs sm:text-sm mr-2 sm:mr-4">
              {auth?.currentUser?.displayName}
            </span>
            <img className="w-8 mr-2" src={auth?.currentUser?.photoURL} />
            <button
              className={`font-sans text-sm font-medium text-white ${
                isUserAuthenticated ? "bg-orange-700" : "bg-blue-600"
              } rounded-full p-2 sm:px-5 sm:py-2 text-xs sm:text-sm`}
              onClick={() => handleSignOut()}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
