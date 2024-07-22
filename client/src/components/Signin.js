import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let quoteInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // validateToken();
    }
  }, []);

  let validateToken = async () => {
    let fd = new FormData();
    fd.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: fd,
    };

    let JSONData = await fetch("/validateToken", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
  };

  let validateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/login", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      localStorage.setItem("token", JSOData.data.token);
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }

    console.log(JSOData);
  };

  let validateLogin2 = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch("/login", reqOptions);

      let JSOData = await JSONData.json();

      if (JSOData.status == "success") {
        dispatch({ type: "login", data: JSOData.data });
        localStorage.setItem("token", JSOData.data.token);
        navigate("/dashboard");
      } else {
        alert(JSOData.msg);
      }

      console.log(JSOData);
    };
  };

  return (
    <div className="App">
      <form>
        <h2
          style={{
            backgroundColor: "deeppink",
            color: "white",
            borderRadius: "20px",
            boxShadow: "10px 10px 10px black",
          }}
        >
          Login
        </h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        {/* <div>
          <label>Quote</label>
          <input ref={quoteInputRef}></input>
        </div> */}
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch(validateLogin2());
            }}
          >
            Sign In
          </button>
        </div>
      </form>
      <div>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Signin;
