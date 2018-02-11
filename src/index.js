import React from "react";
import ReactDOM from "react-dom";
import skygear from "skygear";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

let endPoint = "https://reactdinnerpoll.skygeario.com/";
let apiKey = "8b05aba14a3e4b53a93277ae93a53c13";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  endPoint = "https://zephyrdev.skygeario.com/";
  apiKey = "0a09dd866b8f40df88a48147f4ac4e57";
}

skygear
  .config({
    endPoint,
    apiKey
  })
  .catch(error => console.error(error));

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
