import React from "react";
import React, { useState, useEffect, useRef } from "react";
import BestPracticesContent from "./BestPracticesContent";
import TitleContainer from "./TitleContainer";
import Faq from "./Faq";

const MainContent = () => {
  console.log("rendering start");

  return (
    <div className="bg-[#0E111D] flex justify-center font-Rubik pb-24 sm:pb-32">
      <div className="text-white px-5">
        <TitleContainer />
        <BestPracticesContent />
      </div>
    </div>
  );
};

export default MainContent;
