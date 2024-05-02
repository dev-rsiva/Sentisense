import React from "react";
import LogoContainer from "./titleGenerator/LogoContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-[#0D111B] sm:py-10 text-white font-Rubik shadow-lg sm:px-[50px]">
      <div className="px-5 sm:px-20 w-full flex flex-col sm:flex-row justify-between items-start">
        <div className="sm:w-4/12 mb-6 sm:mb-0 flex flex-col items-start">
          <LogoContainer />
          <p className="py-3 text-sm text-white text-left">
            Our mission is to empower every video creator with the insights and
            inspiration they need to grow. That’s why we’re obsessed with
            providing an intelligent mix of technological and human expertise
            that boosts your productivity and gets you more views. Whatever your
            next challenge, we’ll shine a light on the way forward.
          </p>
        </div>

        <div className="text-sm sm:text-sm mb-6 sm:mb-0">
          <h2 className="py-1 sm:py-3 mb-2 sm:mb-4 font-extrabold text-lg sm:text-lg">
            Our Tools
          </h2>
          <ul className="flex flex-col">
            <li className="mb-2">Youtube Title Generator</li>
            <li className="mb-2">Youtube Description Generator</li>
            <li className="mb-2">Youtube Tag Generator</li>
            <li className="mb-2">
              Youtube Sentinent Comment Analyser(Upcoming)
            </li>
            <li className="mb-2">Keyword Extractor(Upcoming)</li>
            <li className="mb-2">Youtube Hashtag Generator(Upcoming)</li>
          </ul>
        </div>

        <div className="font-semibold text-xs sm:text-sm mb-6 sm:mb-0">
          <h2 className="py-1 sm:py-3 mb-2 sm:mb-4 font-extrabold text-lg sm:text-lg]">
            Connect With Us
          </h2>
          <ul className="flex">
            <li className="text-3xl mr-4">
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li className="text-3xl mr-4">
              <FontAwesomeIcon icon={faInstagram} />
            </li>
            <li className="text-3xl mr-4">
              <FontAwesomeIcon icon={faYoutube} />
            </li>
            <li className="text-3xl mr-4">
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li className="text-3xl mr-4">
              <FontAwesomeIcon icon={faLinkedin} />
            </li>
          </ul>
        </div>
      </div>
      <p className="px-5 sm:px-20 py-3 text-sm text-white text-left">
        © 2024 sentiSense. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
