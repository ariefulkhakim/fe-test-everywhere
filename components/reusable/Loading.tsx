import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center h-[600px]">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-100 h-16 w-16"></div>
        <p className="text-[20px] mt-3">Loading....</p>
      </div>
    </div>
  );
};

export default Loading;
