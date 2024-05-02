import React from "react";
import { useNavigate } from "react-router-dom";

const LogoContainer = () => {
  const navigate = useNavigate();
  return (
    <div
      className="pt-0 pb-2 flex flex-col justify-end mr-2 sm:mr-24 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <h1 className="font-bold text-lg sm:text-2xl">
        senti<span className="text-[#139DFF]">Sense</span>
      </h1>
      <p className="text-[8px] sm:text-[10px] text-right pr-4 sm:pr-2 ">
        YOUTUBE SEO KIT
      </p>
    </div>
  );
};

export default LogoContainer;
