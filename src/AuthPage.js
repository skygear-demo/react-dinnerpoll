import React from "react";
import { Container, Row, Col } from "reactstrap";
import Banner from "./Banner";
import SignInForm from "./SignInForm";

export default () => (
  <Container>
    <Row>
      <Col>
        <Banner />
      </Col>
    </Row>

    <Row className="mt-3 justify-content-center">
      <Col sm="5">
        <SignInForm />
      </Col>
    </Row>
  </Container>
);
