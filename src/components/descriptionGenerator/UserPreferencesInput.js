import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const UserPreferencesInput = ({ data }) => {
  const [
    handleContentTypeClick,
    contentType,
    setContentType,
    additionalUserInfo,
    additionalUserInfoValue,
  ] = data;

  console.log(contentType);
  const isCheckBoxDisabled = (name) => {
    return contentType?.length >= 2 && !contentType?.includes(name);
  };

  return (
    <div id="userPreferences">
      <div className="flex flex-col justify-center items-center mb-8 pt-12">
        <h2 className="py-6 font-extrabold text-[#c7cbd5] text-[28px] sm:text-[24px] text-center underline">
          Refine Descriptions Based on Your Preferences
        </h2>
        <FontAwesomeIcon icon={faArrowDown} className="text-2xl" />
      </div>
      {/* <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">
          Choose the Desired Length of Title:
        </p>
        <div className="text-[#c7cbd5] flex pl-60">
          <ul>
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
      </div> */}

      <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">Focus Areas: (choose only two)</p>
        <div className="text-[#c7cbd5] flex pl-60">
          <ul className="flex flex-wrap gap-2">
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType1"
                value="Time-Saving Tips"
                disabled={isCheckBoxDisabled("Time-Saving Tips")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Time-Saving Tips">Time-Saving Tips</label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType2"
                value="Budget-Friendly Options"
                disabled={isCheckBoxDisabled("Budget-Friendly Options")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Budget-Friendly Options">
                Budget-Friendly Options
              </label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType3"
                value="Common Mistakes to Avoid"
                disabled={isCheckBoxDisabled("Common Mistakes to Avoid")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Common Mistakes to Avoid">
                Common Mistakes to Avoid
              </label>
            </li>

            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType4"
                value="Pro Tips and Techniques"
                disabled={isCheckBoxDisabled("Pro Tips and Techniques")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Pro Tips and Techniques">
                Pro Tips and Techniques
              </label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="In-Depth Explanation"
                disabled={isCheckBoxDisabled("In-Depth Explanation")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="In-Depth Explanation">In-Depth Explanation</label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="How-To Videos"
                disabled={isCheckBoxDisabled("How-To Videos")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="How-To Videos">How-To Videos</label>
            </li>

            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Review Videos"
                disabled={isCheckBoxDisabled("Review Videos")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Review Videos">Review Videos</label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Listicles"
                disabled={isCheckBoxDisabled("Listicles")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Listicles">Listicles</label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Beginner-Friendly Guide"
                disabled={isCheckBoxDisabled("Beginner-Friendly Guide")}
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Beginner-Friendly Guide">
                Beginner-Friendly Guide
              </label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Tips for Experienced Users"
                disabled={
                  isCheckBoxDisabled("Tips for Experienced Users")
                    ? true
                    : false
                }
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Tips for Experienced Users">
                Tips for Experienced Users
              </label>
            </li>
            <li className="pb-2 w-[320px]">
              <input
                className="mr-3 cursor-pointer"
                type="checkbox"
                name="contentType5"
                value="Advanced Techniques and Knowledge"
                disabled={
                  isCheckBoxDisabled("Advanced Techniques and Knowledge")
                    ? true
                    : false
                }
                onChange={(e) => handleContentTypeClick(e)}
              />
              <label htmlFor="Advanced Techniques and Knowledge">
                Advanced Techniques and Knowledge
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">Choose the Tone/Style:</p>
        <div className="text-[#c7cbd5] flex pl-60">
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
      </div> */}
      <div className="w-full text-left pt-8">
        <p className="text-xl font-bold pb-6">
          Additional information: (any specific focus area)
        </p>
        <div className="text-[#c7cbd5] flex pl-60">
          <input
            ref={additionalUserInfo}
            className=" min-w-[450px] outline-none px-4 py-2 text-black rounded"
            type="textarea"
            name="additionalUserInfo"
          />
        </div>
        {/* <div className="text-[#c7cbd5] flex pl-60">
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
        </div> */}
      </div>
    </div>
  );
};

export default UserPreferencesInput;
