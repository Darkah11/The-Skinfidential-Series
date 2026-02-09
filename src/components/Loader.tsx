import React from "react";

export const RotatingCircle = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
    </div>
  );
};
