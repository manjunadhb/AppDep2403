import React from "react";
import TopNavigation from "./TopNavigation";
import { useDispatch } from "react-redux";

function Leaves() {
  let dispatch = useDispatch();
  return (
    <div>
      <TopNavigation />
      <h1>Leaves</h1>
      <button
        onClick={() => {
          dispatch({ type: "applyLeave", data: 1 });
        }}
      >
        Apply Leave
      </button>
      <button
        onClick={() => {
          dispatch({ type: "postponeLeave", data: 2 });
        }}
      >
        Postpone Leave
      </button>
      <button
        onClick={() => {
          dispatch({ type: "cancelLeave", data: 3 });
        }}
      >
        Cancel Leave
      </button>
    </div>
  );
}

export default Leaves;
