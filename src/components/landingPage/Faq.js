import React, { useState } from "react";
import { TITLE_FAQ } from "../../utils/constants";

const Faq = () => {
  const [showIndex, setShowIndex] = useState(null);
  return (
    <div className="text-center sm:mx-[280px] mt-12 sm:mt-16">
      <h2 className="py-3 font-extrabold text-[28px] sm:text-[34px]">
        Frequently Asked Questions
      </h2>
      <div className="py-3 text-white">
        {TITLE_FAQ.map((each, index) => {
          return (
            <div
              key={index}
              className="rounded-2xl bg-gray-400 bg-opacity-20 p-[2px] text-left mb-6 sm:mr-4"
            >
              <div
                className={`w-full h-full bg-[#0E111D] ${
                  index === showIndex ? "bg-opacity-70" : ""
                } p-3 sm:p-6 rounded-2xl`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-[16px] sm:text-[18px] font-bold sm:font-extrabold">
                    {each.question}
                  </h3>
                  <button
                    className="font-bold text-xl border-2 border-white rounded-full w-8 min-w-8 h-8 min-h-8"
                    onClick={() =>
                      setShowIndex(index === showIndex ? null : index)
                    }
                  >
                    {showIndex === index ? "-" : "+"}
                  </button>
                </div>
                {showIndex === index && (
                  <p className="mt-3 sm:pr-10">{each.answer}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
