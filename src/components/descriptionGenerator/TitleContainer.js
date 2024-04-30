import React from "react";
import {
  TITLE_FIRST_LINE,
  TITLE_HEADLINE,
  TITLE_SUB_HEADLINE,
} from "../../utils/constants";
const TitleContainer = () => {
  return (
    <div
      id="title-container"
      className="text-center sm:mx-[155px] mt-10"
      //   style={{
      //     backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==")`,
      //   }}
    >
      <h1
        className="bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text 
font-bold text-lg sm:text-xl tracking-[6px] py-4"
      >
        {TITLE_FIRST_LINE}
      </h1>
      <h1 className="py-3 sm:leading-[4rem] font-extrabold text-2xl sm:text-[56px]">
        {TITLE_HEADLINE}
      </h1>
      <h2 className="py-4 text-base sm:text-[22px] text-[#c7cbd5]">
        {TITLE_SUB_HEADLINE}
      </h2>
    </div>
  );
};

export default TitleContainer;
