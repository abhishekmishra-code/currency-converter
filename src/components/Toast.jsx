import React from "react";

const Toast = ({ children, show, type = "success" }) => {
  const colorClass = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    show && (
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 transform ${colorClass} animate-fadeInOut rounded-md px-4 py-2 text-white shadow-lg md:right-6 md:bottom-6 md:left-auto md:translate-x-0`}
        aria-live="polite"
      >
        {children}
      </div>
    )
  );
};

export default Toast;
