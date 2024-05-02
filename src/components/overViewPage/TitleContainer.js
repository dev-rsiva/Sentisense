import React from "react";
import {
  TITLE_FIRST_LINE,
  TITLE_HEADLINE,
  TITLE_SUB_HEADLINE,
} from "../../utils/constants";
const TitleContainer = () => {
  return (
    <div id="title-container" className="text-center sm:mx-[155px] mt-10">
      <h1
        className="bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text 
font-bold text-lg sm:text-xl tracking-[6px] py-4 px-2"
      >
        {/* BEGIN YOUR YOUTUBE MASTERY WITH GPT-3.5 */}
        {/* AI-DRIVEN YOUTUBE GROWTH MADE EASY */}
        AI POWERED YOUTUBE OPTIMIZATION WITH GPT-3.5
      </h1>
      <h1 className="py-3 sm:leading-[4rem] font-extrabold text-2xl sm:text-[56px]">
        Dominate YouTube with Sentisense: Elevate Your SEO Game Now!
      </h1>
      <h2 className="py-4 text-base sm:text-[22px] text-[#c7cbd5] px-2">
        Revolutionize Your Channel's Performance with Our All-in-One YouTube SEO
        Kit
      </h2>
    </div>
  );
};

export default TitleContainer;
