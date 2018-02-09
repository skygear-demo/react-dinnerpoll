import React from "react";
import { Container, Row, Col } from "reactstrap";
import Banner from "./Banner";
import SignInForm from "./SignInForm";

export default ({ onSignIn, onAsyncStart, onAsyncEnd }) => (
  <Container>
    <Row>
      <Col>
        <Banner />
      </Col>
    </Row>

    <Row className="mt-3 justify-content-center">
      <Col sm="5">
        <SignInForm
          onSignIn={onSignIn}
          onAsyncStart={onAsyncStart}
          onAsyncEnd={onAsyncEnd}
        />
      </Col>
    </Row>
  </Container>
);
