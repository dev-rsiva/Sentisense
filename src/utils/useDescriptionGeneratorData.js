import React, { useState, useEffect, useRef } from "react";
// import { faCopy } from "@fortawesome/free-regular-svg-icons";
// import { TAGS_BEST_PRACTICES } from "../utils/constants";
// import { SHADOW_IMG } from "../utils/constants";

import { openai } from "./openai";
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
} from "./constants";
// import { sampleVideos } from "../utils/sampleVideos";
import descriptionPrompt from "./descriptionPrompt";
import descriptionUserPreferencePrompt from "./descriptionUserPreferencePrompt";

const useDescriptionGeneratorData = () => {
  console.log("useTitleGenerator Started");
  const topicRef = useRef(null);
  const topicRefValue = topicRef?.current?.value;

  const additionalUserInfo = useRef(null);
  const additionalUserInfoValue = additionalUserInfo?.current?.value;
  const [competitorDescriptions, setCompetitorDescriptions] = useState(null);
  const [videos, setVideos] = useState(null);
  const [generatedDescriptions, setGeneratedDescriptions] = useState(null);
  const [competitorAnalysis, setCompetitorAnalysis] = useState(false);
  const [seoDescriptionssAreLoading, setSeoDescriptionssAreLoading] =
    useState(false);

  const [lengthOfTitle, setLengthOfTitle] = useState(null);
  const [contentType, setContentType] = useState([]);
  const [tone, setTone] = useState([]);
  const [refinedDescriptions, setRefinedDescriptions] = useState(null);
  const [refinedDescriptionsAreLoading, setRefinedDescriptionsAreLoading] =
    useState(false);
  const [userPreferences, setUserPreferences] = useState(false);
  const [doRefine, setDoRefine] = useState(false);

  console.log(videos);

  useEffect(() => {
    console.log("useEffect");

    const gptQuery = descriptionPrompt(topicRefValue, competitorDescriptions);

    const fetchVideos = async () => {
      console.log("Fetching videos");
      const getDescriptionsExecution = competitorDescriptions && gptQuery;
      console.log(getDescriptionsExecution);
      console.log("competitor Descriptions :", competitorDescriptions);
      console.log("gptQuery :", gptQuery);

      if (competitorDescriptions && gptQuery) {
        console.log("gptQuery is true");
        await getDescriptions(gptQuery);
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
        const getCompetitorDescriptions = res.items
          ? res.items
              ?.slice(0, 10)
              ?.map((eachVideo) => `"${eachVideo?.snippet?.description}"`)
              ?.join("\n")
          : "Not Available";

        console.log(getCompetitorDescriptions);
        setCompetitorDescriptions(getCompetitorDescriptions);

        console.log("setvideos setted");
      });
    };

    const getDescriptions = async (gptQuery) => {
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const result = data.choices[0].message.content;
      console.log(result);

      const arrayStartsAt = result.indexOf("[");
      const arrayEndsAt = result.lastIndexOf("]");
      console.log(arrayStartsAt);
      console.log(arrayEndsAt);
      console.log(result[arrayStartsAt]);
      console.log(result[arrayEndsAt]);

      if (
        arrayStartsAt !== -1 &&
        arrayStartsAt <= 3 &&
        arrayEndsAt !== -1 &&
        arrayEndsAt <= 3
      ) {
        const descriptionsJson = result.substring(
          arrayStartsAt,
          arrayEndsAt + 1
        );
        console.log(descriptionsJson);

        const descriptionsArray = JSON.parse(
          descriptionsJson.replace(/[\n\r]/g, "\\n")
        );

        setGeneratedDescriptions(descriptionsArray);
      } else {
        const objListStartsAt = result.indexOf("{");
        const objListEndsAt = result.lastIndexOf("}");

        const descriptionsJson = result.substring(
          objListStartsAt,
          objListEndsAt + 1
        );
        console.log(descriptionsJson);

        const descriptionsArray = JSON.parse(`[${descriptionsJson}]`);
        console.log(descriptionsArray);

        setGeneratedDescriptions(descriptionsArray);
      }

      setSeoDescriptionssAreLoading(false);
      setCompetitorAnalysis(false);
    };

    if (competitorAnalysis) {
      fetchVideos();
    }

    // getResults.choices[0].message.content;
  }, [competitorAnalysis, competitorDescriptions]);

  useEffect(() => {
    //Fetch refined Descriptions from openai
    const gptQuery = descriptionUserPreferencePrompt(
      generatedDescriptions,
      contentType,
      additionalUserInfoValue
    );

    const fetchRefinedDescriptions = async (gptQuery) => {
      console.log(gptQuery);
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
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

      if (
        arrayStartsAt !== -1 &&
        arrayStartsAt <= 3 &&
        arrayEndsAt !== -1 &&
        arrayEndsAt <= 3
      ) {
        const descriptionsJson = result.substring(
          arrayStartsAt,
          arrayEndsAt + 1
        );

        const descriptionsArray = JSON.parse(`[${descriptionsJson}]`);

        console.log(descriptionsArray);

        setRefinedDescriptions(descriptionsArray);
      } else {
        const objListStartsAt = result.indexOf("{");
        const objListEndsAt = result.lastIndexOf("}");

        const descriptionsJson = result.substring(
          objListStartsAt,
          objListEndsAt + 1
        );

        const descriptionsArray = JSON.parse(`[${descriptionsJson}]`);

        console.log(descriptionsArray);
        setRefinedDescriptions(descriptionsArray);
      }

      setRefinedDescriptionsAreLoading(false);
      setUserPreferences(false);
    };

    console.log(doRefine);
    console.log(generatedDescriptions);

    if (doRefine && generatedDescriptions) {
      fetchRefinedDescriptions(gptQuery);
    }
  }, [doRefine]);

  return [
    topicRef,
    additionalUserInfo,
    additionalUserInfoValue,
    contentType,
    setCompetitorDescriptions,
    videos,
    setVideos,
    generatedDescriptions,
    setGeneratedDescriptions,
    setCompetitorAnalysis,
    seoDescriptionssAreLoading,
    setSeoDescriptionssAreLoading,
    setLengthOfTitle,
    setContentType,
    setTone,
    refinedDescriptions,
    setRefinedDescriptions,
    refinedDescriptionsAreLoading,
    setRefinedDescriptionsAreLoading,
    userPreferences,
    setUserPreferences,
    setDoRefine,
  ];
};

export default useDescriptionGeneratorData;
