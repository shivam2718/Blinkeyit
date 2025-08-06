import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[140px] w-full flex items-center justify-center p-6">
      <svg
        className="animate-spin h-8 w-8 text-teal-500"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 3C35.8 3 39.58 3.75 43.1 5.21C46.62 6.66 49.81 8.8 52.5 11.5C55.2 14.19 57.34 17.38 58.79 20.9C60.25 24.42 61 28.19 61 32C61 35.81 60.25 39.58 58.79 43.1C57.34 46.62 55.2 49.81 52.5 52.5C49.81 55.2 46.62 57.34 43.1 58.79C39.58 60.25 35.81 61 32 61C28.19 61 24.42 60.25 20.9 58.79C17.38 57.34 14.19 55.2 11.5 52.5C8.8 49.81 6.66 46.62 5.21 43.1C3.75 39.58 3 35.81 3 32C3 28.19 3.75 24.42 5.21 20.9C6.66 17.38 8.8 14.19 11.5 11.5C14.19 8.8 17.38 6.66 20.9 5.21C24.42 3.75 28.19 3 32 3Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 3C36.58 3 41.09 4.08 45.17 6.16C49.25 8.24 52.78 11.26 55.47 14.96C58.16 18.66 59.93 22.95 60.64 27.47C61.36 31.99 60.99 36.62 59.58 40.98"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
      </svg>
    </div>
  );
};

export default Loading;
