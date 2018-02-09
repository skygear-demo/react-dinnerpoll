import React from "react";
import AuthPage from "./AuthPage";

class App extends React.Component {
  render() {
    return (
      <div
        className="d-flex flex-column justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        {false ? <div>Hello, world!</div> : <AuthPage />}
      </div>
    );
  }
}

export default App;
