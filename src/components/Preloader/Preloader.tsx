import React from "react";

interface Props {
  show: boolean;
}

const Preloader: React.FC<Props> = ({ show }) => {
  return (
    <div
      id="preloader"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
