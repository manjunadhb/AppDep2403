import React from "react";
import TopNavigation from "./TopNavigation";
import { useDispatch } from "react-redux";

function Tasks() {
  let dispatch = useDispatch();

  return (
    <div>
      <TopNavigation />
      <h1>Tasks</h1>
      <button
        onClick={() => {
          dispatch({ type: "addTask", data: 1 });
        }}
      >
        Add Task
      </button>
      <button
        onClick={() => {
          dispatch({ type: "submitTask", data: 2 });
        }}
      >
        Submit Task
      </button>
      <button
        onClick={() => {
          dispatch({ type: "deleteTask", data: 3 });
        }}
      >
        Delete Task
      </button>
    </div>
  );
}

export default Tasks;
