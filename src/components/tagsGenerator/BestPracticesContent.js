import React from "react";
import { TAGS_BEST_PRACTICES } from "../../utils/constants";
import {
  TAGS_FIRST_LINE,
  TAGS_HEADLINE,
  TAGS_SUB_HEADLINE,
  TAGS_SUBHEADINGS,
  TAGS_BEST_PRACTICES_HEADING,
  TAGS_BEST_PRACTICES,
  TAGS_SUB_HEADINGS2,
  TAGS_FAQ,
  OPENAI_KEY,
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_VIDEO_API,
} from "../../utils/constants";

const BestPracticesContent = () => {
  return (
    <div>
      <div className="text-center sm:mx-[155px] mt-8 sm:mt-16">
        <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
          {TAGS_SUBHEADINGS.question}
        </h2>
        <p className="py-3 text-[18px] text-white px-2">{TAGS_SUBHEADINGS.answer}</p>
      </div>
      <div className="text-center sm:mx-[155px] mt-12 sm:mt-16">
        <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
          {TAGS_BEST_PRACTICES_HEADING}
        </h2>
        <div className="py-3 text-white flex flex-wrap justify-center items-center">
          {TAGS_BEST_PRACTICES.map((each, index) => {
            return (
              <div
                key={index}
                className="sm:max-w-[300px] sm:h-[175px] rounded-2xl bg-gradient-to-r from-purple-400 to-blue-500 p-[2px] text-left mb-6 sm:mr-4"
              >
                <div className="w-full h-full bg-[#0E111D] p-6 rounded-2xl">
                  <h3 className="text-[18px] font-extrabold">{each.heading}</h3>
                  <p className="text-sm mt-3">{each.para}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="text-center sm:mx-[155px] mt-12 sm:mt-16 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
        <div className="sm:mr-2">
          <img
            className="sm:w-[90%] h-auto mt-6"
            src="https://vidiq.com/_next/image/?url=%2Fimg%2Ftitle-generator.png&w=640&q=75"
          />
        </div>

        <div className="sm:w-[80%] text-left">
          <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
            {TAGS_SUB_HEADINGS2.question}
          </h2>
          <p className="py-3 text-[18px] text-white">
            {TAGS_SUB_HEADINGS2.answer}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default BestPracticesContent;
