import React from "react";

const searchStatus = ({ onPhrase, lengthUsers }) => {
  return (
    <span className={"badge bg-" + (lengthUsers > 0 ? "primary" : "danger")}>
      {onPhrase(lengthUsers)}
    </span>
  );
};

export default searchStatus;
