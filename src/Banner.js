import React from "react";
import { Container, Row, Col } from "reactstrap";
import Logo from "./Logo";

export default () => (
  <Container>
    <Row className="justify-content-center align-items-center">
      <Col xs="auto">
        <Logo />
      </Col>
      <Col className="text-center" xs="auto">
        <h1>What's for dinner?</h1>
        <small className="text-muted">
          A simple polling demo using Skygear
        </small>
      </Col>
    </Row>
  </Container>
);
