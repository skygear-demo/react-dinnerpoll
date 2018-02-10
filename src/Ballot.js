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
    fakeAsyncOperation([]).then(dishes => {
      dishes = [...this._defaultDishes, ...dishes];
      this.setState({
        options: dishes.map((dish, index) => (
          <Col sm="3" key={index.toString()} className="mb-3">
            <Card className="text-center">
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
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  vote() {
    if (this.state.selectedDish !== null) {
      console.log(this.state.selectedDish);
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
