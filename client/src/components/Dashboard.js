import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function Dashboard() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });

  let deleteProfile = async () => {
    let fd = new FormData();
    fd.append("email", storeObj.loginDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: fd,
    };

    let JSONData = await fetch("/deleteProfile", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);
    if (JSOData.status == "success") {
      navigate("/");
    }
  };

  return (
    <div>
      <TopNavigation />
      <h2>Welcome User</h2>
      <h3>
        Welcome {storeObj.loginReducer.loginDetails.firstName}{" "}
        {storeObj.loginReducer.loginDetails.lastName}
      </h3>
      <img src={`/${storeObj.loginReducer.loginDetails.profilePic}`}></img>
      <button
        onClick={() => {
          deleteProfile();
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Dashboard;
