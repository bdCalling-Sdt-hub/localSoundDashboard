import React from "react";
import { Triangle } from "react-loader-spinner";

const LoaderWraperComp = ({
  isLoading,
  isError,
  height,
  dataEmpty = false,
  children,
}) => {
  if (isLoading || isError || dataEmpty) {
    return (
      <div
        className={` ${
          height ? height : "h-[50vh]"
        } w-full flex flex-col justify-center items-center`}
      >
        {isLoading ? (
          <>
            <Triangle
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{
                animation: "0 spin 0.8s linear infinite", // Adjust speed here
              }}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#FFFFFF"
              color="#9610FF"
            />
            {/* <ImSpinner3 size={40} className="animate-spin transition-all" /> */}
            <span className="text-sm text-gray-300">Loading...</span>
          </>
        ) : isError ? (
          <h1 className="text-red-400">Something want wrong!</h1>
        ) : (
          <h1 className="text-green-400">
            {isError ? isError : "Empty data!"}
          </h1>
        )}
      </div>
    );
  }
  return children;
};

export default LoaderWraperComp;