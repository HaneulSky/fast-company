import React from "react";

const Qualitie = ({ _id, color, name }) => {
  return (
    <span
      key={_id}
      className={`badge me-2 bg-${color}`}
      style={{ color: "white" }}
    >
      {name}
    </span>
  );
};

export default Qualitie;
