import React from "react";
import { TAGS_BEST_PRACTICES } from "../../utils/constants";
import { TITLE_SUB_HEADINGS2, TOOLS_OVERVIEW } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BestPracticesContent = () => {
  return (
    <div>
      <div className="text-center sm:mx-[155px] mt-12 sm:mt-16">
        <h2 className="py-10 font-extrabold text-[28px] sm:text-[34px]">
          Try the Free SEO Tools Now !
        </h2>
        <div className="py-3 text-white flex flex-wrap justify-center items-center px-3">
          {TOOLS_OVERVIEW.map((each, index) => {
            return (
              <Link to={each.link}>
                <div
                  key={index}
                  className={`sm:w-[470px] sm:h-[320px] rounded-2xl bg-gradient-to-r from-purple-700 to-blue-900 px-[2px] py-[8px] text-left mb-6 sm:mb-12 sm:mr-8 ${
                    index <= 2 ? "cursor-pointer" : "cursor-not-allowed"
                  } relative`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {index > 2 && (
                    <p className="absolute left-6 top-6 text-base sm:text-lg text-slate-800">
                      <FontAwesomeIcon icon={faWandSparkles} className="mr-4" />
                      Upcoming
                    </p>
                  )}
                  <div className="flex flex-col justify-center items-center text-white w-full h-full p-6 rounded-2xl">
                    <div className="py-4">{each.icon}</div>
                    <div className="text-center">
                      <h3 className="text-[18px] sm:text-[20px] font-extrabold">
                        {each.heading}
                      </h3>
                      <p className="text-sm sm:text-base mt-3">{each.para}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestPracticesContent;

// bg-[#0E111D]
