import React from "react";
import skygear from "skygear";
import { Button, Form, FormGroup, Input } from "reactstrap";
import CustomAlert from "./CustomAlert";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      event: null
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
        console.error(error);
        if (
          error.code === skygear.ErrorCodes.InvalidCredentials ||
          error.code === skygear.ErrorCodes.ResourceNotFound
        ) {
          this.setState({
            event: {
              type: "error",
              message: "invalid username or password"
            }
          });
        } else {
          this.setState({
            event: {
              type: "error",
              message: error.message
            }
          });
        }
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
        <CustomAlert event={this.state.event} />
        <Button color="primary" block onClick={this.handleSignIn}>
          Sign in
        </Button>
      </Form>
    );
  }
}

export default SignInForm;
