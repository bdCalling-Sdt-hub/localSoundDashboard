import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const MagnifingGlassLoader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{
          animation: "0 spin 0.8s linear infinite", // Adjust speed here
        }}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#FFFFFF"
        color="#9610FF"
      />
    </div>
  );
};

export default MagnifingGlassLoader;
