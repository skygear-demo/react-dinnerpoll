import React from "react";
import skygear from "skygear";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      invalidCredentials: false,
      unknownError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "username" || event.target.name === "password") {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSignIn() {
    skygear.auth
      .loginWithUsername(this.state.username, this.state.password)
      .then(this.props.onSignIn)
      .catch(error => {
        if (
          error.error.code === skygear.ErrorCodes.InvalidCredentials ||
          error.error.code === skygear.ErrorCodes.ResourceNotFound
        ) {
          this.setState({ invalidCredentials: true });
        } else {
          this.setState({ unknownError: true });
        }
      });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Alert color="warning" isOpen={this.state.invalidCredentials}>
          Invalid username or password
        </Alert>
        <Button color="primary" block onClick={this.handleSignIn}>
          Sign in
        </Button>
        <Button color="link" block>
          Sign up?
        </Button>
      </Form>
    );
  }
}

export default SignInForm;
