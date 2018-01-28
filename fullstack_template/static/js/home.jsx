import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import '../home.css';

ReactDOM.render(<HomePage username={window.username} course={window.course}/>, document.getElementById("content"));