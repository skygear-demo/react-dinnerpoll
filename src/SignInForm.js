import React from "react";
import skygear from "skygear";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignIn() {
    this.props.onAsyncStart();
    skygear.auth
      .loginWithUsername(this.state.username, this.state.password)
      .then(this.props.onSignIn)
      .catch(({ error }) => {
        // if (
        //   error.error.code === skygear.ErrorCodes.InvalidCredentials ||
        //   error.error.code === skygear.ErrorCodes.ResourceNotFound
        // ) {
        //   this.setState({ invalidCredentials: true });
        // } else {
        //   console.error(error);
        //   this.setState({ unknownError: true });
        // }
        this.setState({ error });
      })
      .finally(this.props.onAsyncEnd);
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
        <Alert color="danger" isOpen={this.state.error !== null}>
          {this.state.error
            ? this.state.error.code === skygear.ErrorCodes.InvalidCredentials ||
              this.state.error.code === skygear.ErrorCodes.ResourceNotFound
              ? "Error: invalid username or password"
              : this.state.error.message
            : ""}
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
