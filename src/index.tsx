import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ParseDataProvider } from "./utils/parse-hooks";

ReactDOM.render(
  <ParseDataProvider>
    <App />
  </ParseDataProvider>,
  document.getElementById("root")
);
