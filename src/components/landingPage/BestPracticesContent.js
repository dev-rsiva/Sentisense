import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TAGS_BEST_PRACTICES } from "../../utils/constants";
import {
  LP_SUBHEADINGS,
  LP_BEST_PRACTICES_HEADING,
  LP_BEST_PRACTICES,
  LP_SUBHEADINGS2,
} from "../../utils/constants";
import tagVideo from "./tagVideo.mp4";
import titleVideo from "./titleVideo.mp4";
import descriptionVideo from "./descriptionVideo.mp4";
import competitorAnalysis_image from "./competitorAnalysis_image.png";
import twoTypesOfAnalysis from "./twoTypesOfAnalysis.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../../utils/dataContext";
const BestPracticesContent = () => {
  const { setIsSignInForm } = useContext(dataContext);

  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center sm:mx-[155px] mt-24 sm:mt-20">
        <h2 className="py-3 font-bold px-3 sm:font-extrabold text-[24px] sm:text-[38px]">
          Boost your YouTube expansion with sentiSense's AI Coach..
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center sm:mt-10 ">
          <div className="my-6 sm:mr-32">
            <video
              className="p-2 sm:p-8 border-2 border-purple-400 rounded-lg shadow-spread "
              autoPlay
              loop
              muted
              controls={false}
            >
              <source src={titleVideo} type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="py-3 font-bold text-[24px] sm:text-[34px] sm:text-left">
              Unlock your 24/7 AI SEO Companion
            </h2>
            <p className="py-3 text-base sm:text-[18px] text:[#c7cbd5] sm:text-white sm:text-left">
              GPT-3.5 + Your Competitor YouTube Channel = Top Ranking Titles.
            </p>
            <button
              className="font-sans text-lg font-semibold sm:font-bold sm:text-xl text-white bg-blue-600 px-8 py-4 my-4 mr-4 rounded-full flex items-center"
              onClick={() => {
                navigate("/login");
                setIsSignInForm(false);
              }}
            >
              <span className="mr-4">Start Generating Titles</span>

              <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center sm:mx-[155px] mt-20 sm:mt-28">
        <h2 className="py-3 font-extrabold text-[24px] sm:text-[38px]">
          Maximize Views Using Sentisense's <br />
          Competitor Analysis
        </h2>
        <p className="py-3 px-4 text-base sm:text-[22px] text-[#c7cbd5] sm:text-center">
          Unlock insights, outshine rivals, and boost views with Sentisense's
          Competitor Analysis. Discover trends, optimize strategies, and attract
          more viewers to your YouTube channel. Elevate performance
          effortlessly.
        </p>
        <div className="mt-10">
          <img
            className="w-full h-full border-2 border-purple-400 rounded-3xl sm:p-4 shadow-spread"
            src={competitorAnalysis_image}
          />
        </div>
      </div>

      <div className="text-center sm:mx-[155px] mt-24 sm:mt-28">
        <div className="w-full flex flex-col-reverse sm:flex-row-reverse justify-center items-center sm:mt-10 ">
          <div className="w-7/9 my-8 sm:my-0">
            <img
              className="h-full border-2 border-purple-400 rounded-3xl p-1 sm:p-4 shadow-spread"
              src={twoTypesOfAnalysis}
            />
          </div>
          <div className="sm:mr-14 flex flex-col justify-center items-center sm:items-start">
            <h2 className="my-3 font-bold text-[24px] sm:text-[34px] sm:text-left">
              Supercharge Your YouTube Titles with Intelligent Analysis!
            </h2>
            <p className="my-3 text-[18px] text-white sm:text-left">
              Drive Engagement: Merge Competitor Research & User Preferences.
            </p>
            <button
              className="font-sans text-base font-semibold sm:font-bold sm:text-xl text-white bg-blue-600 px-8 py-4 my-3 sm:my-4 rounded-full flex items-center"
              onClick={() => {
                navigate("/login");
                setIsSignInForm(false);
              }}
            >
              <span className="mr-4 ">Craft Winning Titles Now!</span>

              <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-24">
        <div
          id="title-container"
          className="text-center sm:mx-[155px] mt-2 flex flex-row-reverse justify-center items-center"
        >
          <div className="w-7/9 mr-4 flex flex-col justify-center items-center shadow-spread rounded-2xl px-6 py-6 sm:py-24 my-8 sm:my-16">
            <h1 className="py-4 sm:leading-[6rem] font-extrabold text-2xl sm:text-[72px]">
              Supercharge your YouTube channel today
            </h1>

            <h2 className="py-4 text-base sm:leading-[3rem] sm:text-[24px] text-[#c7cbd5]">
              Join the millions of creators using vidIQ to grow their channels
            </h2>

            <button
              className="font-sans text-sm sm:font-bold sm:text-xl text-white bg-blue-600 px-8 py-4 my-4 rounded-full flex items-center"
              onClick={() => {
                navigate("/login");
                setIsSignInForm(false);
              }}
            >
              <span className="mr-4">Sign Up Now!</span>

              <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPracticesContent;
