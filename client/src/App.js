import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Tasks from "./components/Tasks";
import Leaves from "./components/Leaves";
import StatusUpdate from "./components/StatusUpdate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/leaves" element={<Leaves />}></Route>
        <Route path="/su" element={<StatusUpdate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
