import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || "100%",
        height: height || "",
        borderRadius: borderRadius || ""
      }}
    ></div>
  );
};

export default Skeleton;
