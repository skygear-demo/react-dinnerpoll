import React from "react";
import skygear from "skygear";
import { Button, Form, FormGroup, Input } from "reactstrap";
import AuthPageAlert from "./AuthPageAlert";

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
        <AuthPageAlert error={this.state.error} />
        <Button color="primary" block onClick={this.handleSignIn}>
          Sign in
        </Button>
      </Form>
    );
  }
}

export default SignInForm;
