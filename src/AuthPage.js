import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Banner from "./Banner";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true // false => isSignUp
    };

    this.switchForm = this.switchForm.bind(this);
  }

  switchForm() {
    this.setState(prevState => {
      return {
        isSignIn: !prevState.isSignIn
      };
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Banner />
          </Col>
        </Row>

        <Row className="mt-3 justify-content-center">
          <Col sm="5">
            {this.state.isSignIn ? (
              <SignInForm
                onSignIn={this.props.onSignIn}
                onAsyncStart={this.props.onAsyncStart}
                onAsyncEnd={this.props.onAsyncEnd}
              />
            ) : (
              <SignUpForm
                onSignUp={this.props.onSignUp}
                onAsyncStart={this.props.onAsyncStart}
                onAsyncEnd={this.props.onAsyncEnd}
              />
            )}
            <Button color="link" block onClick={this.switchForm}>
              {this.state.isSignIn ? "Sign up?" : "Sign in?"}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AuthPage;
