import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const DisplayTags = ({ tags, descriptionIndex, handleCopyClick }) => {
  console.log(tags, descriptionIndex, handleCopyClick);

  return (
    <div className="flex flex-wrap justify-center">
      {tags.map((tagsObj) => {
        return tagsObj.tags.map((eachTag, index) => {
          return (
            <div
              key={index}
              className="sm:w-[400px] rounded-2xl bg-gray-400 bg-opacity-20 p-[2px] text-left mb-6 sm:mr-4 mt-6"
            >
              <div
                className={`w-full h-full bg-[#0E111D] bg-opacity-70 p-3 sm:px-6 sm:py-4 rounded-2xl`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-[16px] sm:text-[18px] font-normal sm:font-normal">
                    {eachTag}
                  </h3>
                  <button className="font-bold text-2xl w-8 h-8">
                    <div
                      className="relative"
                      onClick={() => handleCopyClick(eachTag, index)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                      {descriptionIndex === index && (
                        <p
                          className={`w-[100px] absolute z-10 -right-2 top-15 sm:left-20 sm:-top-2 px-4 py-3 rounded text-blue-500 bg-white  text-base`}
                        >
                          Copied !
                        </p>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default DisplayTags;
