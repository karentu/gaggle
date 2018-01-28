import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

ReactDOM.render(<HomePage username={window.username} course={window.course}/>, document.getElementById("content"));