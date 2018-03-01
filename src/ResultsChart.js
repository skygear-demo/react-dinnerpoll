import React from "react";
import Chart from "chart.js";
import randomColor from "randomcolor";
import skygear from "skygear";

class ResultsChart extends React.Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.props.onAsyncStart();
    skygear
      .lambda("query_polling_results")
      .then(({ results }) => {
        new Chart(this.chart, {
          type: "bar",
          data: {
            labels: results.map(result => result.dish),
            datasets: [
              {
                data: results.map(result => result.count),
                backgroundColor: randomColor({
                  count: results.length,
                  luminosity: "light",
                  format: "rgba",
                  alpha: 0.5
                }),
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            title: {
              display: true,
              text: "# of votes"
            }
          }
        });
      })
      .catch(error => {
        console.error(error);
        this.props.onEvent({
          type: "error",
          message: "fail to load results"
        });
      })
      .finally(this.props.onAsyncEnd);
  }

  componentDidMount() {
    this.refresh();

    skygear.pubsub.on("vote", this.refresh);
  }

  render() {
    return (
      <canvas
        ref={chart => {
          this.chart = chart;
        }}
      />
    );
  }
}

export default ResultsChart;
