import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const UserPreferencesInput = ({ data }) => {
  const [handleContentTypeClick, handleLengthClick, handleToneClick] = data;
  return (
    <div className="px-3" id="userPreferences">
      <div className="flex flex-col justify-center items-center mb-8 pt-12">
        <h2 className="py-6 font-extrabold text-[#c7cbd5] text-[28px] sm:text-[24px] text-center underline">
          Refine Titles Based on Your Preferences
        </h2>
        <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />
      </div>
      <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">
          Choose the Desired Length of Title:
        </p>
        <div className="text-[#c7cbd5] flex pl-12 sm:pl-60">
          <ul className="flex flex-col sm:flex-row flex-wrap gap-2">
            <li className="pb-2">
              <input
                className="mr-3 cursor-pointer"
                type="radio"
                name="titleLength"
                value="short"
                onChange={(e) => handleLengthClick(e)}
              />
              <label htmlFor="long">Short - (less than 50 characters)</label>
            </li>
            <li className="pb-2">
              <input
                className="mr-3 cursor-pointer"
                type="radio"
                name="titleLength"
                value="medium"
                onChange={(e) => handleLengthClick(e)}
              />
              <label htmlFor="long">Medium - (50-70 characters)</label>
            </li>
            <li className="pb-2">
              <input
                className="mr-3 cursor-pointer"
                type="radio"
                name="titleLength"
                value="long"
                onChange={(e) => handleLengthClick(e)}
              />
              <label htmlFor="long">Long - (over 70 characters)</label>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">Choose the Content Type:</p>
        <div className="text-[#c7cbd5] flex pl-12 sm:pl-60">
          <ul className="flex flex-wrap gap-2">
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType1"
                value="How-Tos"
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="How-Tos">How-Tos</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType2"
                value="Review"
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Review">Review</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType3"
                value="Listicles"
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Listicles">Listicles</label>
            </li>

            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType4"
                value="Questions"
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Questions">Questions</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Comparisions"
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Comparisions">Comparisions</label>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">Choose the Tone/Style:</p>
        <div className="text-[#c7cbd5] flex pl-12 sm:pl-60">
          <ul className="flex flex-wrap gap-2">
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="Tone/style1"
                value="Serious"
                onChange={(e) => handleToneClick(e)}
              />
              <label htmlFor="Serious">Serious</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="Tone/style2"
                value="Humorous"
                onChange={(e) => handleToneClick(e)}
              />
              <label htmlFor="Humorous">Humorous</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="Tone/style3"
                value="Informative"
                onChange={(e) => handleToneClick(e)}
              />
              <label htmlFor="Informative">Informative</label>
            </li>
            <li className="pb-2 w-[150px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="Tone/style4"
                value="Intriguing"
                onChange={(e) => handleToneClick(e)}
              />
              <label htmlFor="Intriguing">Intriguing</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesInput;
