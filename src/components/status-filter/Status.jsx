import React from "react";
import "./status.css";

const Status = () => {
  return (
    <div className="buttonsGroup">
      <button type="button" className="btn btnAll">
        All
      </button>
      <button type="button" className="btn btnInfo">
        Active
      </button>
      <button type="button" className="btn btnInfo">
        Done
      </button>
    </div>
  );
};

export default Status;
