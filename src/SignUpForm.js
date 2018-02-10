import React from "react";
import skygear from "skygear";
import { Button, Form, FormGroup, Input } from "reactstrap";
import SkygearAlert from "./SkygearAlert";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignUp() {
    this.props.onAsyncStart();
    skygear.auth
      .signupWithUsername(this.state.username, this.state.password)
      .then(this.props.onSignUp)
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
            minLength="1"
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
        <SkygearAlert error={this.state.error} />
        <Button color="primary" block onClick={this.handleSignUp}>
          Sign up
        </Button>
      </Form>
    );
  }
}

export default SignUpForm;
