import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || "100%",
        height: height || "80%",
        borderRadius: borderRadius || "8px"
      }}
    ></div>
  );
};

export default Skeleton;
