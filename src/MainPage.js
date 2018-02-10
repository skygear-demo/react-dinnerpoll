import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import skygear from "skygear";
import Ballot from "./Ballot";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.onAsyncStart();
    skygear.auth
      .logout()
      .then(this.props.onSignOut)
      .catch(error => {
        console.error(error);
      })
      .finally(this.props.onAsyncEnd);
  }

  render() {
    return (
      <Container>
        <Row className="mt-3">
          <Col className="text-right">
            <Button color="primary" onClick={this.handleSignOut}>
              Sign out
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Ballot />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainPage;
