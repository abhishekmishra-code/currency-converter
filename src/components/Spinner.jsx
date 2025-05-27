import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <span className="mt-4 text-sm text-gray-400">Fetching live rates...</span>
    </div>
  );
};

export default Spinner;
