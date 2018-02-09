import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

class SignInForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Input type="text" name="username" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Password" />
        </FormGroup>
        <Button color="primary" block>
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
