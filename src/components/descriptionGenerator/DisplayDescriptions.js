import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const DisplayDescriptions = ({
  descriptions,
  descriptionIndex,
  handleCopyClick,
}) => {
  console.log(descriptions, descriptionIndex, handleCopyClick);

  return (
    <div>
      {descriptions?.map((descriptionObj, index) => {
        return (
          <div
            key={index}
            className="rounded-2xl bg-gray-400 bg-opacity-20 p-[2px] text-left mb-6 sm:mr-4 mt-6"
          >
            <div
              className={`w-full h-full bg-[#0E111D] bg-opacity-70 p-3 sm:px-6 sm:py-4 rounded-2xl`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] sm:text-[18px] font-normal sm:font-normal">
                  {descriptionObj.description
                    .split("\n")
                    .map((line, index, array) => (
                      <React.Fragment key={index}>
                        <p>{line}</p>
                        {index !== array.length - 1 && <br />}{" "}
                        {/* Add <br> except for the last line */}
                      </React.Fragment>
                    ))}
                </h3>
                <button
                  className="font-bold text-2xl w-8 h-8"
                  // onClick={() =>
                  //   setShowIndex(index === showIndex ? null : index)
                  // }
                >
                  <div
                    className="relative"
                    onClick={() =>
                      handleCopyClick(descriptionObj.description, index)
                    }
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
      })}
    </div>
  );
};

export default DisplayDescriptions;
