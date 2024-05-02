import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ButtonsContainer = ({ data }) => {
  const [
    showCompetitorAnalysisBtn,
    handleCompetitorAnalysisClick,
    showUserPreferencesBtn,
    handleUserPreferencesClick,
  ] = data;

  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-4">
        {showCompetitorAnalysisBtn && (
          <>
            <h2 className="py-6 font-extrabold text-[20px] sm:text-[24px]">
              Generate Titles For:
            </h2>
            <button
              className="bg-[#139DFF] w-[320px] sm:w-[500px] px-6 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
              onClick={() => handleCompetitorAnalysisClick()}
            >
              <p className="mr-2 w-full">
                Competitor Analysis Only <br /> (SEO Focus)
              </p>
              <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
            </button>
          </>
        )}

        {showUserPreferencesBtn && (
          <>
            <p className="py-3 font-extrabold text-[18px] sm:text-[24px]">Or</p>

            <button
              className="bg-[#139DFF] w-[320px] sm:w-[500px] px-5 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
              onClick={() => handleUserPreferencesClick()}
            >
              <p className="mr-2">
                Competitor Analysis + User Preferences (Refined Titles)
              </p>
              <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonsContainer;
