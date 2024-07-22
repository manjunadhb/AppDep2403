import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePic, setProfilePic] = useState("./images/noImage.png");

  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    populateUserDetails();
  }, []);

  let populateUserDetails = () => {
    firstNameInputRef.current.value =
      storeObj.loginReducer.loginDetails.firstName;
    lastNameInputRef.current.value =
      storeObj.loginReducer.loginDetails.lastName;
    ageInputRef.current.value = storeObj.loginReducer.loginDetails.age;
    emailInputRef.current.value = storeObj.loginReducer.loginDetails.email;
    mobileNoInputRef.current.value =
      storeObj.loginReducer.loginDetails.mobileNo;
    setProfilePic(`/${storeObj.loginReducer.loginDetails.profilePic}`);
  };

  let onUpdateProfile = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "multipart/form-data");

    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PATCH",
      body: dataToSend,
    };

    let JSONData = await fetch("/updateProfile", reqOptions);

    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  return (
    <div className="App">
      <TopNavigation />
      <form>
        <h2>Edit Profile</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            onChange={(eo) => {
              let selectedImagePath = URL.createObjectURL(eo.target.files[0]);
              setProfilePic(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img src={profilePic} className="picPreview"></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onUpdateProfile();
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
