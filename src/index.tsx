import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Parse from "parse";

declare module "parse";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "", // This is your Application ID
  "" // This is your Javascript key
);

var user = new Parse.User();
let username = "aaron@clearlyinnovative.com";
let password = "password123!!";
user
  .save({ username, email: username, password })
  .then((response: any) => {
    alert(
      "New object create with success! ObjectId: " +
        response.id +
        ", " +
        user.get("username")
    );
  })
  .catch((error: any) => {
    alert("Error: " + error.message);
  });

ReactDOM.render(<App />, document.getElementById("root"));
