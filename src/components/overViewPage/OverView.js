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
import BestPracticesContent from "./BestPracticesContent";
import TitleContainer from "./TitleContainer";
import useTitleGeneratorData from "../../utils/useTitleGeneratorData";

const OverView = () => {
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
      <div className="text-white px-1">
        <TitleContainer />

        <BestPracticesContent />
      </div>
    </div>
  );
};

export default OverView;
