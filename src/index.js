import React from "react";
import ReactDOM from "react-dom";
import skygear from "skygear";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

skygear
  .config({
    endPoint: "https://reactdinnerpoll.skygeario.com/",
    apiKey: "8b05aba14a3e4b53a93277ae93a53c13"
  })
  .catch(error => {
    console.error(error);
  });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
