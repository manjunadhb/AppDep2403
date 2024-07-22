import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();

  let activeLink = (a) => {
    if (a.isActive == true) {
      return { backgroundColor: "green", color: "white" };
    }
  };

  let store = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    if (
      store &&
      store.loginReducer &&
      store.loginReducer.loginDetails &&
      store.loginReducer.loginDetails.email
    ) {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <nav>
      <NavLink
        style={(a) => {
          return activeLink(a);
        }}
        to="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        style={(a) => {
          return activeLink(a);
        }}
        to="/tasks"
      >
        Tasks
      </NavLink>
      <NavLink
        style={(a) => {
          return activeLink(a);
        }}
        to="/editProfile"
      >
        Edit Profile
      </NavLink>
      <NavLink
        style={(a) => {
          console.log(a);

          return activeLink(a);
        }}
        to="/leaves"
      >
        Leaves
      </NavLink>
      <NavLink
        style={(a) => {
          return activeLink(a);
        }}
        to="/su"
      >
        Status Update
      </NavLink>
      <NavLink
        to="/"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
}

export default TopNavigation;
