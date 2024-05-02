import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import DisplayTitles from "./DisplayDescriptions";

const CompetitorAnalysisReport = ({ data }) => {
  const [videos, generatedDescriptions, descriptionIndex, handleCopyClick] =
    data;

  console.log(videos, generatedDescriptions, descriptionIndex, handleCopyClick);

  return (
    <div className="mt-12">
      <h2 className="py-6 font-extrabold text-[#c7cbd5] text-[28px] sm:text-[28px] ">
        Your top 3 competitor's Descriptions:
      </h2>
      <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />

      <div id="competitorDetails" className="flex flex-col p-4 rounded-lg">
        {videos?.slice(0, 3).map((video, index) => (
          <>
            <div
              key={index}
              className="flex flex-col sm:flex-row px-0 sm:px-6 sm:py-6 border-gray-400 shadow-spread rounded-2xl my-4"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                className="rounded-tl-lg rounded-tr-lg sm:rounded-l-lg"
              />

              <div className="flex flex-col px-4 py-4 sm:ml-10 justify-center sm:justify-between items-center sm:items-start">
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start">
                  <h1 className="sm:min-w-[150px]  text-left text-nowrap text-blue-500">
                    Rank
                  </h1>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-lg py-2 sm:hidden"
                  />
                  <span className="sm:ml-2 text-white text-left">
                    {index + 1}
                  </span>
                </div>
                <hr className="w-[300px] my-4 sm:hidden" />
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start">
                  <h1 className="sm:min-w-[150px] text-left text-nowrap text-blue-500">
                    Channel Title
                  </h1>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-lg py-2 sm:hidden"
                  />

                  <span className="sm:ml-2 text-white text-left">
                    {video.snippet.channelTitle}
                  </span>
                </div>
                <hr className="w-[300px] my-4 sm:hidden" />

                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start">
                  <h1 className=" sm:min-w-[150px]  text-left text-nowrap text-blue-500">
                    Video Description
                  </h1>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-lg py-2 sm:hidden"
                  />

                  <span className="sm:ml-2 text-white text-left text-wrap">
                    {video.snippet.description}
                  </span>
                </div>
                <hr className="w-[300px] my-4 sm:hidden" />

                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start">
                  <h1 className="sm:min-w-[150px]  text-left text-nowrap text-blue-500">
                    Publish Time
                  </h1>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-lg py-2 sm:hidden"
                  />

                  <span className="sm:ml-2 text-white text-left">
                    {video.snippet.publishedAt}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="w-full flex justify-center">
                      {index !== 2 && (
                        <hr className="w-64 rounded-lg opacity-50" />
                      )}
                    </div> */}
          </>
        ))}
      </div>

      {/* {generatedTitles?.map((titleObj, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-300 bg-opacity-20 border border-gray-500 rounded "
                  >
                    {titleObj.title}
                  </div>
                );
              })} */}

      <div className="py-3 text-white">
        <h2 className="py-6 font-extrabold text-[28px] text-[#c7cbd5] sm:text-[28px] ">
          Your SEO focused Description:
        </h2>
        <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />

        <DisplayTitles
          descriptions={generatedDescriptions}
          descriptionIndex={descriptionIndex}
          handleCopyClick={handleCopyClick}
        />
      </div>
    </div>
  );
};

export default CompetitorAnalysisReport;
