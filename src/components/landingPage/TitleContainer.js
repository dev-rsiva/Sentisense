import React from "react";
import {
  LP_FIRST_LINE,
  LP_HEADLINE,
  LP_SUB_HEADLINE,
} from "../../utils/constants";
import headlineImage from "./headlineImage_bg_removed.png";
const TitleContainer = () => {
  return (
    <div className="flex flex-col justify-center text-center items-center mt-4 sm:mt-12">
      <div>
        <h1
          className="bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text 
font-bold text-base sm:text-xl tracking-[6px] py-2 sm:py-6"
        >
          {LP_FIRST_LINE}
        </h1>
      </div>
      <div
        id="title-container"
        className="text-center sm:mx-[155px] mt-2 flex flex-col-reverse sm:flex-row-reverse sm:justify-center sm:items-center"
        //   style={{
        //     backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==")`,
        //   }}
      >
        <div className="w-full h-full">
          <img className="w-full h-full rounded-lg" src={headlineImage} />
        </div>

        <div className="w-7/9 mr-4 sm:text-left">
          <h1 className="py-4 sm:leading-[4rem] font-extrabold text-[28px] sm:text-[48px]">
            {LP_HEADLINE}
          </h1>

          <h2 className="py-4 text-base sm:leading-[3rem] sm:text-[24px] text-white">
            {LP_SUB_HEADLINE}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TitleContainer;
