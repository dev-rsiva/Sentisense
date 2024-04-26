import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { TAGS_BEST_PRACTICES } from "../utils/constants";
import { SHADOW_IMG } from "../utils/constants";
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
import competitorAnalysisPrompt from "../utils/competitorAnalysisPrompt";
import userPreferencesPrompt from "../utils/userPreferencesPrompt";

const YoutubeTitleGenerator = () => {
  console.log("renderind start");
  const [showIndex, setShowIndex] = useState(null);
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
  const [generatedTitles, setGeneratedTitles] = useState(null);
  const [refinedTitles, setRefinedTitles] = useState("initial state");

  const [seoTitlesAreLoading, setSeoTitlesAreLoading] = useState(false);
  const [refinedTitlesAreLoading, setRefinedTitlesAreLoading] = useState(false);

  console.log(generatedTitles);
  const topicRef = useRef(null);
  const topicRefValue = topicRef?.current?.value;
  console.log(videos);

  const competitorTitles = videos
    ?.slice(0, 10)
    ?.map((eachVideo) => `"${eachVideo?.snippet?.title}"`)
    ?.join("\n");
  console.log(competitorTitles);

  useEffect(() => {
    console.log("useEffect");

    const gptQuery = competitorAnalysisPrompt(topicRefValue, competitorTitles);

    const fetchVideos = async () => {
      console.log("Fetching videos");
      if (gptQuery) {
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
        setVideos(res.items);
        console.log("setvideos setted");

        setCompetitorAnalysis(false);
      });
    };

    const getTitles = async (gptQuery) => {
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const result = data.choices[0].message.content;
      console.log(result);
      const titlesWithoutHeading = result
        ?.split("Generated Titles:")[1]
        ?.trim();
      console.log(titlesWithoutHeading);
      const titlesArray = titlesWithoutHeading?.split("\n")?.map((title) => {
        const index = title.lastIndexOf("(");
        console.log(index);
        const updatedTitle = title.substring(3, index).trim();
        return updatedTitle;
      });
      console.log(titlesArray);

      setGeneratedTitles(titlesArray);
      // setTimeout(() => setSeoTitlesAreLoading(false), 3000);
      setSeoTitlesAreLoading(false);
    };

    if (competitorAnalysis) {
      fetchVideos();
    }

    // getResults.choices[0].message.content;
  }, [competitorAnalysis]);

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

      const titlesWithoutHeading = result
        ?.split("Generated Titles:")[1]
        ?.trim();
      console.log(titlesWithoutHeading);
      const titlesArray = titlesWithoutHeading?.split("\n")?.map((title) => {
        const index = title?.lastIndexOf("(");
        console.log(index);
        const updatedTitle = title?.substring(3, index).trim();
        return updatedTitle;
      });
      console.log(titlesArray);
      setRefinedTitles(titlesArray);
      setRefinedTitlesAreLoading(false);
    };

    if (doRefine) {
      fetchRefinedTitles(gptQuery);
    }
  }, [doRefine]);

  const handleCompetitorAnalysisClick = () => {
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
  // const result =
  //   "Generated Titles: \n \n 1. Unlock Pizza Perfection: Master Dough Secrets in MINUTES! (Informative, Short, Hook from competitor title 3) \n 2. Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS) (Informative, Medium, Benefit from competitor title 2 & competitor title 1) \n 3. 5 Shocking Pizza Dough Mistakes You're Making (Fix It Now!) (Intriguing, Medium, Listicle inspired by competitor title 3) \n 4. Ultimate Pizza Dough Showdown: Pro Secrets Revealed! (Intriguing, Medium, Comparison inspired by competitor titles) \n 5. Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide (Informative, Long, Keyword focus with instructional approach)";

  // console.log(result);

  const handleClearAllClick = () => {
    setShowCompetitorAnalysisBtn(true);
    setShowUserPreferencesBtn(true);
    setUserPreferences(false);
    setShowClearAllBtn(false);
    setShowTitles(false);
    setShowRefinedTitles(false);
  };

  const handleLengthClick = (e) => {
    setLengthOfTitle(e.target.value);
  };
  console.log("lengthOfTitle:", lengthOfTitle);

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
  console.log("content-Type:", contentType);

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

  console.log("Tone:", tone);

  return (
    <div className="bg-[#0E111D] flex justify-center font-Rubik pb-24 sm:pb-32">
      <div className="text-white px-5">
        <div
          id="title-container"
          className="text-center sm:mx-[155px] mt-10"
          //   style={{
          //     backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==")`,
          //   }}
        >
          <h1
            className="bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text 
        font-bold text-xl tracking-[6px] py-4"
          >
            {TITLE_FIRST_LINE}
          </h1>
          <h1 className="py-3 leading-[4rem] font-extrabold text-4xl sm:text-[56px]">
            {TITLE_HEADLINE}
          </h1>
          <h2 className="py-4 text-[22px] text-[#c7cbd5]">
            {TITLE_SUB_HEADLINE}
          </h2>
        </div>

        {/* <div className="text-center sm:px-[220px] py-4">
          <div className=" bg-gray-700 bg-opacity-25 w-full p-8 rounded-lg border-2 border-gray-400">
            <div className="w-full sm:bg-[#0D111B] rounded-full sm:flex sm:justify-between sm:items-center p-[6px]">
              <input
                className="outline-none bg-[#0D111B] rounded-full w-full h-full text-sm sm:text-base pl-6 py-5 sm:pl-6 sm:py-1 mb-3 sm:mb-0"
                type="text"
                placeholder="Enter The keyword You Want To Rank For"
              />

              <button className="bg-[#139DFF] w-full sm:w-auto px-6 py-3 rounded-full text-lg font-semibold flex justify-center items-center">
                <p className="mr-2">Generate</p>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div> */}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-center sm:px-[220px] py-4"
        >
          {/* className="bg-gray-700 bg-opacity-25 w-full p-8 rounded-lg border-2 border-gray-400" */}
          <div>
            <div className="w-full flex justify-center">
              <div className="sm:w-[500px] text-center sm:bg-white rounded-full sm:flex sm:justify-between sm:items-center p-[6px]">
                <input
                  ref={topicRef}
                  className="outline-none bg-white text-[#0D111B] rounded-full w-full h-full text-sm sm:text-base pl-6 py-5 sm:pl-6 sm:py-3 mb-3 sm:mb-0"
                  type="text"
                  placeholder="Enter The keyword You Want To Rank For..."
                  // value={topic}
                  // onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              {/* {showClearAllBtn && (
                <button
                  className="absolute right-0 bg-amber-700 px-4 py-3 ml-6 rounded-full text-lg font-semibold flex justify-center items-center"
                  onClick={() => handleClearAllClick()}
                >
                  <p className="mr-2 w-full">Clear all</p>
                </button>
              )} */}
            </div>

            <div>
              <div className="flex flex-col justify-center items-center pt-4">
                {showCompetitorAnalysisBtn && (
                  <>
                    <h2 className="py-6 font-extrabold text-[28px] sm:text-[24px]">
                      Generate Titles For:
                    </h2>
                    <button
                      className="bg-[#139DFF] w-[500px] px-6 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
                      onClick={() => handleCompetitorAnalysisClick()}
                    >
                      <p className="mr-2 w-full">
                        Competitor Analysis Only <br /> (SEO Focus)
                      </p>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-2xl"
                      />
                    </button>
                  </>
                )}

                {showUserPreferencesBtn && (
                  <>
                    <p className="py-3 font-extrabold text-[18px] sm:text-[24px]">
                      Or
                    </p>

                    <button
                      className="bg-[#139DFF] w-[500px] px-6 py-3 rounded-full text-lg font-semibold flex justify-center items-center"
                      onClick={() => handleUserPreferencesClick()}
                    >
                      <p className="mr-2">
                        Competitor Analysis + User Preferences (Refined Titles)
                      </p>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-2xl"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>

            {seoTitlesAreLoading && (
              <div>Genrating SEO Focused Titles.......</div>
            )}

            {!seoTitlesAreLoading && showTitles && (
              <div className="bg-gray-300 bg-opacity-20 border border-gray-500">
                {generatedTitles?.map((eachTitle, index) => {
                  return (
                    <div key={index} className="p-4">
                      {eachTitle}
                    </div>
                  );
                })}
              </div>
            )}

            {userPreferences && (
              <div id="userPreferences">
                <div className="w-full text-left pt-10">
                  <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="py-6 font-extrabold text-[#c7cbd5] text-[28px] sm:text-[24px] text-center underline">
                      Refine Titles Based on Your Preferences
                    </h2>
                    <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />
                  </div>

                  <p className="text-xl font-bold pb-6">
                    Choose the Desired Length of Title:
                  </p>
                  <div className="text-[#c7cbd5] flex pl-60">
                    <ul>
                      <li className="pb-2">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          name="titleLength"
                          value="short"
                          onChange={(e) => handleLengthClick(e)}
                        />
                        <label for="long">
                          Short - (less than 50 characters)
                        </label>
                      </li>
                      <li className="pb-2">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          name="titleLength"
                          value="medium"
                          onChange={(e) => handleLengthClick(e)}
                        />
                        <label for="long">Medium - (50-70 characters)</label>
                      </li>
                      <li className="pb-2">
                        <input
                          className="mr-3 cursor-pointer"
                          type="radio"
                          name="titleLength"
                          value="long"
                          onChange={(e) => handleLengthClick(e)}
                        />
                        <label for="long">Long - (over 70 characters)</label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full text-left pt-8">
                  <p className="text-xl font-bold pb-6">
                    Choose the Content Type:
                  </p>
                  <div className="text-[#c7cbd5] flex pl-60">
                    <ul className="flex flex-wrap gap-2">
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="contentType1"
                          value="How-Tos"
                          onChange={(e) => handleContentTypeClick(e)}
                        />
                        <label for="How-Tos">How-Tos</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="contentType2"
                          value="Review"
                          onChange={(e) => handleContentTypeClick(e)}
                        />
                        <label for="Review">Review</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="contentType3"
                          value="Listicles"
                          onChange={(e) => handleContentTypeClick(e)}
                        />
                        <label for="Listicles">Listicles</label>
                      </li>

                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="contentType4"
                          value="Questions"
                          onChange={(e) => handleContentTypeClick(e)}
                        />
                        <label for="Questions">Questions</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="contentType5"
                          value="Comparisions"
                          onChange={(e) => handleContentTypeClick(e)}
                        />
                        <label for="Comparisions">Comparisions</label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full text-left pt-8">
                  <p className="text-xl font-bold pb-6">
                    Choose the Tone/Style:
                  </p>
                  <div className="text-[#c7cbd5] flex pl-60">
                    <ul className="flex flex-wrap gap-2">
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="Tone/style1"
                          value="Serious"
                          onChange={(e) => handleToneClick(e)}
                        />
                        <label for="Serious">Serious</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="Tone/style2"
                          value="Humorous"
                          onChange={(e) => handleToneClick(e)}
                        />
                        <label for="Humorous">Humorous</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="Tone/style3"
                          value="Informative"
                          onChange={(e) => handleToneClick(e)}
                        />
                        <label for="Informative">Informative</label>
                      </li>
                      <li className="pb-2 w-[150px]">
                        <input
                          className="mr-3 cursor-pointer"
                          type="checkbox"
                          name="Tone/style4"
                          value="Intriguing"
                          onChange={(e) => handleToneClick(e)}
                        />
                        <label for="Intriguing">Intriguing</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {refinedTitlesAreLoading && <div>Refined Titles.......</div>}

            {!refinedTitlesAreLoading && showRefinedTitles && (
              <div>
                {refinedTitles?.map((eachTitle) => {
                  <div className="p-4">{eachTitle}</div>;
                })}
              </div>
            )}

            {userPreferences && showRefinedTitlesBtn && (
              <button
                className="mx-auto my-20 bg-[#139DFF] w-[500px] px-6 py-6 rounded-full text-lg font-semibold flex justify-center items-center"
                onClick={() => {
                  setRefinedTitles("Refined Title Strings");
                  // setUserPreferences(false);
                  setShowRefinedTitlesBtn(false);
                  setShowRefinedTitles(true);
                  setRefinedTitlesAreLoading(true);
                  setShowClearAllBtn(true);
                  setDoRefine(true);
                }}
              >
                <p className="mr-2 w-full">Refine Titles</p>
                <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
              </button>
            )}
            {showClearAllBtn && (
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

        <div className="text-center sm:mx-[155px] mt-12 sm:mt-16">
          <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
            {TITLE_SUBHEADINGS.question}
          </h2>
          <p className="py-3 text-[18px] text-white">
            {TITLE_SUBHEADINGS.answer}
          </p>
        </div>

        <div className="text-center sm:mx-[155px] mt-12 sm:mt-16">
          <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
            {TITLE_BEST_PRACTICES_HEADING}
          </h2>
          <div className="py-3 text-white flex flex-wrap justify-center items-center">
            {TITLE_BEST_PRACTICES.map((each, index) => {
              return (
                <div
                  key={index}
                  className="sm:max-w-[300px] sm:h-[175px] rounded-2xl bg-gradient-to-r from-purple-400 to-blue-500 p-[2px] text-left mb-6 sm:mr-4"
                >
                  <div className="w-full h-full bg-[#0E111D] p-6 rounded-2xl">
                    <h3 className="text-[18px] font-extrabold">
                      {each.heading}
                    </h3>
                    <p className="text-sm mt-3">{each.para}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center sm:mx-[155px] mt-12 sm:mt-16 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
          <div className="sm:mr-2">
            <img
              className="sm:w-[90%] h-auto mt-6"
              src="https://vidiq.com/_next/image/?url=%2Fimg%2Ftitle-generator.png&w=640&q=75"
            />
          </div>

          <div className="sm:w-[80%] text-left">
            <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
              {TITLE_SUB_HEADINGS2.question}
            </h2>
            <p className="py-3 text-[18px] text-white">
              {TITLE_SUB_HEADINGS2.answer}
            </p>
          </div>
        </div>

        <div className="text-center sm:mx-[280px] mt-12 sm:mt-16">
          <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
            Frequently Asked Questions
          </h2>
          <div className="py-3 text-white">
            {TITLE_FAQ.map((each, index) => {
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-gray-400 bg-opacity-20 p-[2px] text-left mb-6 sm:mr-4"
                >
                  <div
                    className={`w-full h-full bg-[#0E111D] ${
                      index === showIndex ? "bg-opacity-70" : ""
                    } p-3 sm:p-6 rounded-2xl`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-[16px] sm:text-[18px] font-bold sm:font-extrabold">
                        {each.question}
                      </h3>
                      <button
                        className="font-bold text-xl border-2 border-white rounded-full w-8 h-8"
                        onClick={() =>
                          setShowIndex(index === showIndex ? null : index)
                        }
                      >
                        {showIndex === index ? "-" : "+"}
                      </button>
                    </div>
                    {showIndex === index && (
                      <p className="mt-3 sm:pr-10">{each.answer}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeTitleGenerator;
