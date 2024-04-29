import React, { useState, useEffect, useRef } from "react";
// import { faCopy } from "@fortawesome/free-regular-svg-icons";
// import { TAGS_BEST_PRACTICES } from "../utils/constants";
// import { SHADOW_IMG } from "../utils/constants";

import { openai } from "../utils/openai";
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
} from "../utils/constants";
// import { sampleVideos } from "../utils/sampleVideos";
import competitorAnalysisPrompt from "../utils/competitorAnalysisPrompt";
import userPreferencesPrompt from "../utils/userPreferencesPrompt";

const useTitleGeneratorData = () => {
  console.log("useTitleGenerator Started");
  const [videos, setVideos] = useState(null);

  const [lengthOfTitle, setLengthOfTitle] = useState(null);
  const [contentType, setContentType] = useState([]);
  const [tone, setTone] = useState([]);

  const [showTitles, setShowTitles] = useState(false);
  const [showRefinedTitles, setShowRefinedTitles] = useState(false);

  const [competitorAnalysis, setCompetitorAnalysis] = useState(false);
  const [userPreferences, setUserPreferences] = useState(false);
  const [doRefine, setDoRefine] = useState(false);
  const [showCompetitorAnalysisBtn, setShowCompetitorAnalysisBtn] =
    useState(true);
  const [showUserPreferencesBtn, setShowUserPreferencesBtn] = useState(true);
  const [showClearAllBtn, setShowClearAllBtn] = useState(false);
  const [showRefinedTitlesBtn, setShowRefinedTitlesBtn] = useState(false);
  const [competitorTitles, setCompetitorTitles] = useState(null);
  const [generatedTitles, setGeneratedTitles] = useState(null);
  const [refinedTitles, setRefinedTitles] = useState(null);

  const [seoTitlesAreLoading, setSeoTitlesAreLoading] = useState(false);
  const [refinedTitlesAreLoading, setRefinedTitlesAreLoading] = useState(false);
  const [titleIndex, setTitleIndex] = useState(null);

  const topicRef = useRef(null);
  const topicRefValue = topicRef?.current?.value;

  useEffect(() => {
    console.log("useEffect");

    const gptQuery = competitorAnalysisPrompt(topicRefValue, competitorTitles);

    const fetchVideos = async () => {
      console.log("Fetching videos");
      const getTitlesExecution = competitorTitles && gptQuery;
      console.log(getTitlesExecution);
      console.log("competitorTitles :", competitorTitles);
      console.log("gptQuery :", gptQuery);

      if (competitorTitles && gptQuery) {
        console.log("gptQuery is true");
        await getTitles(gptQuery);
      }

      const fetchData = fetch(
        YOUTUBE_SEARCH_VIDEO_API +
          topicRefValue +
          "&type=video&key=" +
          YOUTUBE_API_KEY
      );
      const data = fetchData.then((res) => res.json());
      const json = data.then((res) => {
        console.log("executing");
        console.log(res.items);
        setVideos(res.items);
        const getCompetitorTitles = res.items
          ? res.items
              ?.slice(0, 10)
              ?.map((eachVideo) => `"${eachVideo?.snippet?.title}"`)
              ?.join("\n")
          : "Not Available";

        console.log(getCompetitorTitles);
        setCompetitorTitles(getCompetitorTitles);

        console.log("setvideos setted");
      });
    };

    const getTitles = async (gptQuery) => {
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const result = data.choices[0].message.content;
      console.log(result);

      const arrayStartsAt = result.indexOf("[");
      const arrayEndsAt = result.indexOf("]");
      console.log(arrayStartsAt);
      console.log(arrayEndsAt);
      console.log(result[arrayStartsAt]);
      console.log(result[arrayEndsAt]);

      if (arrayStartsAt !== -1 && arrayEndsAt !== -1) {
        const titlesJson = result.substring(arrayStartsAt, arrayEndsAt + 1);

        const titlesArray = JSON.parse(titlesJson);

        console.log(titlesArray);

        setGeneratedTitles(titlesArray);
      } else {
        const objListStartsAt = result.indexOf("{");
        const objListEndsAt = result.lastIndexOf("}");

        const titlesJson = result.substring(objListStartsAt, objListEndsAt + 1);

        const titlesArray = `[${JSON.parse(titlesJson)}]`;

        console.log(titlesArray);
        setGeneratedTitles(titlesArray);
      }

      setSeoTitlesAreLoading(false);
      setCompetitorAnalysis(false);
    };

    if (competitorAnalysis) {
      fetchVideos();
    }

    // getResults.choices[0].message.content;
  }, [competitorAnalysis, competitorTitles]);

  useEffect(() => {
    //Fetch refined titles from openai
    const gptQuery = userPreferencesPrompt(
      generatedTitles,
      lengthOfTitle,
      contentType,
      tone
    );

    const fetchRefinedTitles = async (gptQuery) => {
      console.log(gptQuery);
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      console.log(data);
      const result = data.choices[0].message.content;
      console.log(result);

      const arrayStartsAt = result.indexOf("[");
      const arrayEndsAt = result.indexOf("]");
      console.log(arrayStartsAt);
      console.log(arrayEndsAt);
      console.log(result[arrayStartsAt]);
      console.log(result[arrayEndsAt]);

      if (arrayStartsAt !== -1 && arrayEndsAt !== -1) {
        const titlesJson = result.substring(arrayStartsAt, arrayEndsAt + 1);

        const titlesArray = JSON.parse(titlesJson);

        console.log(titlesArray);

        setRefinedTitles(titlesArray);
      } else {
        const objListStartsAt = result.indexOf("{");
        const objListEndsAt = result.lastIndexOf("}");

        const titlesJson = result.substring(objListStartsAt, objListEndsAt + 1);

        const titlesArray = `[${JSON.parse(titlesJson)}]`;

        console.log(titlesArray);
        setRefinedTitles(titlesArray);
      }

      setRefinedTitlesAreLoading(false);
      setUserPreferences(false);
    };

    console.log(doRefine);
    console.log(generatedTitles);

    if (doRefine && generatedTitles) {
      fetchRefinedTitles(gptQuery);
    }
  }, [doRefine]);

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


  return [
    topicRef,
    topicRefValue,
    videos,
    setVideos,
    lengthOfTitle,
    setLengthOfTitle,
    contentType,
    setContentType,
    tone,
    setTone,
    showTitles,
    setShowTitles,
    showRefinedTitles,
    setShowRefinedTitles,
    competitorAnalysis,
    setCompetitorAnalysis,
    userPreferences,
    setUserPreferences,
    doRefine,
    setDoRefine,
    showCompetitorAnalysisBtn,
    setShowCompetitorAnalysisBtn,
    showUserPreferencesBtn,
    setShowUserPreferencesBtn,
    showClearAllBtn,
    setShowClearAllBtn,
    showRefinedTitlesBtn,
    setShowRefinedTitlesBtn,
    competitorTitles,
    setCompetitorTitles,
    generatedTitles,
    setGeneratedTitles,
    refinedTitles,
    setRefinedTitles,
    seoTitlesAreLoading,
    setSeoTitlesAreLoading,
    refinedTitlesAreLoading,
    setRefinedTitlesAreLoading,
    titleIndex,
    setTitleIndex,
    handleCompetitorAnalysisClick,
    handleUserPreferencesClick,
    handleClearAllClick,
    handleLengthClick,
    handleContentTypeClick,
    handleToneClick,
    handleCopyClick,
  ];
};

export default useTitleGeneratorData;
