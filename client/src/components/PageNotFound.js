import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Sign In</Link>
    </div>
  );
}

export default PageNotFound;
