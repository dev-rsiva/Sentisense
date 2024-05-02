import { useState, useEffect, useRef } from "react";
import { openai } from "./openai";
import { YOUTUBE_API_KEY, YOUTUBE_SEARCH_VIDEO_API } from "./constants";
import tagsPrompt from "./tagsPrompt";

const useTagsGeneratorData = () => {
  console.log("useTitleGenerator Started");
  const topicRef = useRef(null);
  const topicRefValue = topicRef?.current?.value;
  const [competitorTitles, setCompetitorTitles] = useState(null);
  const [videos, setVideos] = useState(null);
  const [generatedTags, setGeneratedTags] = useState(null);
  const [competitorAnalysis, setCompetitorAnalysis] = useState(false);
  const [seoTagsAreLoading, setSeoTagsAreLoading] = useState(false);

  console.log(videos);

  useEffect(() => {
    console.log("useEffect");

    const gptQuery = tagsPrompt(topicRefValue, competitorTitles);

    const fetchVideos = async () => {
      console.log("Fetching videos");
      const getTitlesExecution = competitorTitles && gptQuery;
      console.log(getTitlesExecution);
      console.log("competitor Descriptions :", competitorTitles);
      console.log("gptQuery :", gptQuery);

      if (competitorTitles && gptQuery) {
        console.log("gptQuery is true");
        await getTags(gptQuery);
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

    const getTags = async (gptQuery) => {
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
        const tagsJson = result.substring(arrayStartsAt, arrayEndsAt + 1);
        console.log(tagsJson);

        const tagsArray = JSON.parse(tagsJson.replace(/[\n\r]/g, "\\n"));

        setGeneratedTags(tagsArray);
      } else {
        const objListStartsAt = result.indexOf("{");
        const objListEndsAt = result.lastIndexOf("}");

        const tagsJson = result.substring(objListStartsAt, objListEndsAt + 1);
        console.log(tagsJson);

        const tagsArray = JSON.parse(`[${tagsJson}]`);
        console.log(tagsArray);

        setGeneratedTags(tagsArray);
      }

      setSeoTagsAreLoading(false);
      setCompetitorAnalysis(false);
    };

    if (competitorAnalysis) {
      fetchVideos();
    }
  }, [competitorAnalysis, competitorTitles]);

  return [
    topicRef,
    setCompetitorTitles,
    videos,
    setVideos,
    generatedTags,
    setGeneratedTags,
    setCompetitorAnalysis,
    seoTagsAreLoading,
    setSeoTagsAreLoading,
    topicRef,
    setCompetitorTitles,
    videos,
    setVideos,
    generatedTags,
    setGeneratedTags,
    setCompetitorAnalysis,
    seoTagsAreLoading,
    setSeoTagsAreLoading,
  ];
};

export default useTagsGeneratorData;
