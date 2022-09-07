import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full z-10 bg-black-transparent-0.7 rounded-md flex items-center justify-center">
      <div className="loader">
        <div className="dbl-spin-1"></div>
        <div className="dbl-spin-2"></div>
      </div>
    </div>
  );
}

export default Loading;
