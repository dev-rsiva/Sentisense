import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ButtonsContainer = ({ data }) => {
  const [showCompetitorAnalysisBtn, handleCompetitorAnalysisClick] = data;

  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-4 mt-4">
        {showCompetitorAnalysisBtn && (
          <>
            <button
              className="bg-[#139DFF] w-[350px] sm:w-[500px] px-6 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
              onClick={() => handleCompetitorAnalysisClick()}
            >
              <p className="mr-2 w-full">
                <span className="sm:text-2xl">Generate Tags</span>
                <br />{" "}
                <span className="text-base sm:text-xl">
                  (Competitor Analysis + SEO Focus)
                </span>
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
