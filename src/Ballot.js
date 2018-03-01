import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody
} from "reactstrap";
import skygear from "skygear";
import { height } from "window-size";

const fakeAsyncOperation = data =>
  new Promise(resolve => setTimeout(resolve, 100, data));

class Ballot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedDish: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.vote = this.vote.bind(this);
  }

  _defaultDishes = [
    {
      name: "Buger",
      description: "Burger, beacon, cheese and fries!"
    },
    {
      name: "Char Siu",
      description: "Barbecued pork in Cantonese cuisine."
    },
    {
      name: "Noodles",
      description: "Traditional wanton noodles in soup."
    },
    {
      name: "Pizza",
      description: "Pizza! I want more pizza and cheese!"
    }
  ];

  componentDidMount() {
    this.props.onAsyncStart();
    fakeAsyncOperation([])
      .then(dishes => {
        dishes = [...this._defaultDishes, ...dishes];
        this.setState({
          options: dishes.map((dish, index) => (
            <Col sm="3" key={index.toString()} className="mb-3">
              <Card className="text-center" style={{ minHeight: "100%" }}>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                  <input
                    type="radio"
                    name="selectedDish"
                    value={dish.name}
                    onChange={this.handleChange}
                  />
                </CardBody>
              </Card>
            </Col>
          ))
        });
      })
      .finally(this.props.onAsyncEnd);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  vote() {
    if (this.state.selectedDish) {
      const Vote = skygear.Record.extend("vote");
      this.props.onAsyncStart();
      skygear.publicDB
        .save(
          new Vote({
            dish: this.state.selectedDish
          })
        )
        .then(() => {
          this.props.onEvent({
            type: "success"
          });

          skygear.pubsub.publish("vote", {});
        })
        .catch(error => {
          console.error(error);
          this.props.onEvent({
            type: "error",
            message: "fail to vote"
          });
        })
        .finally(this.props.onAsyncEnd);
    } else {
      this.props.onEvent({
        type: "warning",
        message: "no dish is selected"
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>{this.state.options}</Row>
        <Row>
          <Col className="text-right">
            <Button color="primary" onClick={this.vote}>
              Vote !
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ballot;
