import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import skygear from "skygear";
import Ballot from "./Ballot";
import CustomAlert from "./CustomAlert";
import ResultsChart from "./ResultsChart";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.alert = this.alert.bind(this);
  }

  handleSignOut() {
    this.props.onAsyncStart();
    skygear.auth
      .logout()
      .then(this.props.onSignOut)
      .catch(({ error }) => {
        console.error(error);
        this.setState({
          event: {
            type: "error",
            message: error.message
          }
        });
      })
      .finally(this.props.onAsyncEnd);
  }

  alert(event) {
    this.setState({ event }, () => {
      setTimeout(() => {
        this.setState({ event: null });
      }, 3000);
    });
  }

  render() {
    return (
      <Container>
        <div
          style={{
            position: "fixed",
            width: "30%",
            top: 20,
            right: 20,
            zIndex: 1
          }}
        >
          <CustomAlert event={this.state.event} />
        </div>

        <Row className="mt-3">
          <Col className="text-right">
            <Button color="primary" onClick={this.handleSignOut}>
              Sign out
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <ResultsChart
              onEvent={this.alert}
              onAsyncStart={this.props.onAsyncStart}
              onAsyncEnd={this.props.onAsyncEnd}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Ballot
              onEvent={this.alert}
              onAsyncStart={this.props.onAsyncStart}
              onAsyncEnd={this.props.onAsyncEnd}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainPage;
