import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import skygear from "skygear";

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
        <Row>
          <Col className="text-right">
            <Button color="primary" onClick={this.handleSignOut}>
              Sign out
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainPage;
