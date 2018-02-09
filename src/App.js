import React from "react";
import skygear from "skygear";
import AuthPage from "./AuthPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    this.setState({ user: skygear.auth.currentUser });
  }

  render() {
    return (
      <div
        className="d-flex flex-column justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        {this.state.user ? (
          <div>Hello, world!</div>
        ) : (
          <AuthPage onSignIn={this.updateUser} />
        )}
      </div>
    );
  }
}

export default App;
