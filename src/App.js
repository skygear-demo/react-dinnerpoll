import React from "react";
import { Progress } from "reactstrap";
import skygear from "skygear";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: skygear.auth.currentUser, //skygear.auth.currentUser,true
      isBusy: false
    };

    this.updateUser = this.updateUser.bind(this);
    this.showProgressBar = this.showProgressBar.bind(this);
    this.dismissProgressBar = this.dismissProgressBar.bind(this);
  }

  updateUser() {
    this.setState({ user: skygear.auth.currentUser });
  }

  showProgressBar() {
    this.setState({ isBusy: true });
  }

  dismissProgressBar() {
    this.setState({ isBusy: false });
  }

  render() {
    return (
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Progress
          style={{ visibility: this.state.isBusy ? "visible" : "hidden" }}
          animated
          color="primary"
          value="100"
        />

        {this.state.user ? (
          <MainPage
            onSignOut={this.updateUser}
            onAsyncStart={this.showProgressBar}
            onAsyncEnd={this.dismissProgressBar}
          />
        ) : (
          <div
            className="d-flex flex-column justify-content-center"
            style={{ flex: "auto" }}
          >
            <AuthPage
              className="d-flex flex-column justify-content-center"
              style={{ flex: "auto" }}
              onSignIn={this.updateUser}
              onSignUp={this.updateUser}
              onAsyncStart={this.showProgressBar}
              onAsyncEnd={this.dismissProgressBar}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
