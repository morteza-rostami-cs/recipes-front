import React from "react";

const Container = ({ children, styles }) => {
  return (
    <div className={`${styles} mx-auto max-w-7xl  w-full`}>{children}</div>
  );
};

export default Container;
