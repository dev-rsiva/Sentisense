import React from "react";
import React, { useState } from "react";
import Loading from "./Loading";
import CompetitorAnalysisReport from "./CompetitorAnalysisReport";
import BestPracticesContent from "./BestPracticesContent";
import Faq from "./Faq";
import ButtonsContainer from "./ButtonsContainer";
import TitleContainer from "./TitleContainer";
import useTagsGeneratorData from "../../utils/useTagsGeneratorData";

const YoutubeTagsGenerator = () => {
  console.log("rendering start");

  const [descriptionIndex, setDescriptionIndex] = useState(null);
  const [showCompetitorAnalysisBtn, setShowCompetitorAnalysisBtn] =
    useState(true);
  const [showClearAllBtn, setShowClearAllBtn] = useState(false);
  const [showTags, setShowTags] = useState(false);

  const [
    topicRef,
    setCompetitorTitles,
    videos,
    setVideos,
    generatedTags,
    setGeneratedTags,
    setCompetitorAnalysis,
    seoTagsAreLoading,
    setSeoTagsAreLoading,
  ] = useTagsGeneratorData();

  const handleCompetitorAnalysisClick = () => {
    setVideos(null);
    setGeneratedTags(null);
    setSeoTagsAreLoading(true);
    setCompetitorAnalysis(true);
    setShowCompetitorAnalysisBtn(false);
    setShowClearAllBtn(true);
    setShowTags(true);
  };

  const handleClearAllClick = () => {
    setVideos(null);
    setCompetitorTitles(null);
    setGeneratedTags(null);
    topicRef.current.value = null;
    setShowCompetitorAnalysisBtn(true);
    setCompetitorAnalysis(false);
    setShowClearAllBtn(false);
    setShowTags(false);
    window.scrollTo(0, 0);
  };

  const handleCopyClick = (tag, index) => {
    navigator.clipboard.writeText(tag);
    setDescriptionIndex(index);
    setTimeout(() => setDescriptionIndex(null), 3000);
  };

  console.log(seoTagsAreLoading);

  return (
    <div className="bg-[#0E111D] flex justify-center font-Rubik pb-24 sm:pb-32">
      <div className="text-white px-1">
        <TitleContainer />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-center sm:px-[220px] py-4"
        >
          <div>
            <div className="w-full flex justify-center">
              <div className="w-[350px] sm:w-[500px] text-center sm:bg-white rounded-full sm:flex sm:justify-between sm:items-center p-[6px]">
                <input
                  ref={topicRef}
                  className="outline-none bg-white text-[#0D111B] rounded-full w-full h-full text-sm sm:text-base pl-6 py-5 sm:pl-6 sm:py-3 mb-3 sm:mb-0"
                  type="text"
                  placeholder="Enter The keyword You Want To Rank For..."
                />
              </div>
            </div>
            <ButtonsContainer
              data={[showCompetitorAnalysisBtn, handleCompetitorAnalysisClick]}
            />
            {seoTagsAreLoading && <Loading />}
            {!seoTagsAreLoading && showTags && (
              <CompetitorAnalysisReport
                data={[
                  videos,
                  generatedTags,
                  descriptionIndex,
                  handleCopyClick,
                ]}
              />
            )}

            {showClearAllBtn && !seoTagsAreLoading && (
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

        <BestPracticesContent />
        <Faq />
      </div>
    </div>
  );
};

export default YoutubeTagsGenerator;
