import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="my-14">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#c084fc", "#c084fc", "#3b82f6", "#3b82f6", "#3b82f6"]}
        />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
