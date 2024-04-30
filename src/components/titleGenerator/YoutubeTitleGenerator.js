import React from "react";
import React, { useState, useEffect, useRef } from "react";
import { openai } from "../../utils/openai";
import {
  TITLE_FIRST_LINE,
  TITLE_HEADLINE,
  TITLE_SUB_HEADLINE,
  TITLE_SUBHEADINGS,
  TITLE_BEST_PRACTICES_HEADING,
  TITLE_BEST_PRACTICES,
  TITLE_SUB_HEADINGS2,
  TITLE_FAQ,
  OPENAI_KEY,
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_VIDEO_API,
} from "../../utils/constants";
// import { sampleVideos } from "../utils/sampleVideos";
import competitorAnalysisPrompt from "../../utils/competitorAnalysisPrompt";
import userPreferencesPrompt from "../../utils/userPreferencesPrompt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import CompetitorAnalysisReport from "./CompetitorAnalysisReport";
import DisplayTitles from "./DisplayTitles";
import UserPreferencesInput from "./UserPreferencesInput";
import BestPracticesContent from "./BestPracticesContent";
import Faq from "./Faq";
import ButtonsContainer from "./ButtonsContainer";
import TitleContainer from "./TitleContainer";
import useTitleGeneratorData from "../../utils/useTitleGeneratorData";

const YoutubeTitleGenerator = () => {
  console.log("rendering start");

 

  const [showRefinedTitles, setShowRefinedTitles] = useState(false);
  const [showRefinedTitlesBtn, setShowRefinedTitlesBtn] = useState(false);

  const [titleIndex, setTitleIndex] = useState(null);
  const [showCompetitorAnalysisBtn, setShowCompetitorAnalysisBtn] =
    useState(true);
  const [showUserPreferencesBtn, setShowUserPreferencesBtn] = useState(true);
  const [showClearAllBtn, setShowClearAllBtn] = useState(false);
  const [showTitles, setShowTitles] = useState(false);

  const [
    topicRef,
    setCompetitorTitles,
    videos,
    setVideos,
    generatedTitles,
    setGeneratedTitles,
    setCompetitorAnalysis,
    seoTitlesAreLoading,
    setSeoTitlesAreLoading,
    setLengthOfTitle,
    setContentType,
    setTone,
    refinedTitles,
    setRefinedTitles,
    refinedTitlesAreLoading,
    setRefinedTitlesAreLoading,
    userPreferences,
    setUserPreferences,
    setDoRefine,
  ] = useTitleGeneratorData();

  const handleCompetitorAnalysisClick = () => {
    setVideos(null);
    setGeneratedTitles(null);
    setSeoTitlesAreLoading(true);
    setCompetitorAnalysis(true);
    setUserPreferences(false);
    setShowCompetitorAnalysisBtn(false);
    setShowUserPreferencesBtn(false);
    setShowClearAllBtn(true);
    setShowTitles(true);
  };

  const handleUserPreferencesClick = () => {
    setGeneratedTitles(null);
    setCompetitorAnalysis(true);
    setUserPreferences(true);
    setShowRefinedTitlesBtn(true);
    setShowUserPreferencesBtn(false);
    setShowCompetitorAnalysisBtn(false);
    setSeoTitlesAreLoading(true);
    setShowTitles(true);
  };

  const handleClearAllClick = () => {
    setVideos(null);
    setCompetitorTitles(null);
    setGeneratedTitles(null);
    topicRef.current.value = null;
    setLengthOfTitle(null);
    setContentType([]);
    setTone([]);
    setRefinedTitles(null);
    setShowCompetitorAnalysisBtn(true);
    setShowUserPreferencesBtn(true);
    setCompetitorAnalysis(false);
    setUserPreferences(false);
    setDoRefine(false);
    setShowClearAllBtn(false);
    setShowTitles(false);
    setShowRefinedTitles(false);
  };

  const handleLengthClick = (e) => {
    setLengthOfTitle(e.target.value);
  };

  const handleContentTypeClick = (e) => {
    setContentType((prev) => {
      let updatedContentType = [...prev];

      if (e.target.checked) {
        updatedContentType = [...updatedContentType, e.target.value];
      } else {
        updatedContentType.splice(
          updatedContentType.indexOf(e.target.value),
          1
        );
      }

      return updatedContentType;
    });
  };

  const handleToneClick = (e) => {
    setTone((prev) => {
      let updatedTone = [...prev];

      if (e.target.checked) {
        updatedTone = [...updatedTone, e.target.value];
      } else {
        updatedTone.splice(updatedTone.indexOf(e.target.value), 1);
      }

      return updatedTone;
    });
  };

  const handleCopyClick = (title, index) => {
    navigator.clipboard.writeText(title);
    setTitleIndex(index);
    setTimeout(() => setTitleIndex(null), 3000);
  };

  console.log(refinedTitlesAreLoading, seoTitlesAreLoading);

  return (
    <div className="bg-[#0E111D] flex justify-center font-Rubik pb-24 sm:pb-32">
      <div className="text-white px-5">
        <TitleContainer />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-center sm:px-[220px] py-4"
        >
          {/* className="bg-gray-700 bg-opacity-25 w-full p-8 rounded-lg border-2 border-gray-400" */}
          <div>
            <div className="w-full flex justify-center">
              <div className="w-[350px] sm:w-[500px] text-center sm:bg-white rounded-full sm:flex sm:justify-between sm:items-center p-[6px]">
                <input
                  ref={topicRef}
                  className="outline-none bg-white text-[#0D111B] rounded-full w-full h-full text-sm sm:text-base pl-6 py-5 sm:pl-6 sm:py-3 mb-3 sm:mb-0"
                  type="text"
                  placeholder="Enter The keyword You Want To Rank For..."
                  // value={topic}
                  // onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>
            {/* -----------------------------XXX---------------------------------- */}
            <ButtonsContainer
              data={[
                showCompetitorAnalysisBtn,
                handleCompetitorAnalysisClick,
                showUserPreferencesBtn,
                handleUserPreferencesClick,
              ]}
            />

            {seoTitlesAreLoading && <Loading />}

            {!seoTitlesAreLoading && showTitles && (
              <CompetitorAnalysisReport
                data={[videos, generatedTitles, titleIndex, handleCopyClick]}
              />
            )}

            {userPreferences && !seoTitlesAreLoading && (
              <UserPreferencesInput
                data={[
                  handleContentTypeClick,
                  handleLengthClick,
                  handleToneClick,
                ]}
              />
            )}

            {refinedTitlesAreLoading && <Loading />}

            {!refinedTitlesAreLoading && showRefinedTitles && (
              <div className="py-3 text-white">
                <h2 className="py-6 font-extrabold text-[28px] text-[#c7cbd5] sm:text-[28px] ">
                  Your Refined Titles:
                </h2>
                <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />

                <DisplayTitles
                  titles={refinedTitles}
                  titleIndex={titleIndex}
                  handleCopyClick={handleCopyClick}
                />
              </div>
            )}

            {userPreferences &&
              showRefinedTitlesBtn &&
              !seoTitlesAreLoading && (
                <button
                  className="mx-auto my-20 bg-[#139DFF] w-[500px] px-6 py-6 rounded-full text-lg font-semibold flex justify-center items-center"
                  onClick={() => {
                    setDoRefine(true);
                    // setUserPreferences(false);
                    setShowRefinedTitlesBtn(false);
                    setShowRefinedTitles(true);
                    setRefinedTitlesAreLoading(true);
                    setShowClearAllBtn(true);
                  }}
                >
                  <p className="mr-2 w-full">Refine Titles</p>
                  <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                </button>
              )}
            {showClearAllBtn &&
              !seoTitlesAreLoading &&
              !refinedTitlesAreLoading && (
                <div className="flex justify-center">
                  <button
                    className="bg-amber-700 px-4 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
                    onClick={() => handleClearAllClick()}
                  >
                    <p className="mr-2 w-full">Clear all</p>
                  </button>
                </div>
              )}
          </div>
        </form>
        {/* -----------------------------XXX---------------------------------- */}

        <BestPracticesContent />
        <Faq />
      </div>
    </div>
  );
};

export default YoutubeTitleGenerator;
