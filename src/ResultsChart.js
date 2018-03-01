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
        this.chart.data.labels = results.map(result => result.dish);
        this.chart.data.datasets[0] = {
          data: results.map(result => result.count),
          backgroundColor: randomColor({
            count: results.length,
            luminosity: "light",
            format: "rgba",
            alpha: 0.5
          }),
          borderWidth: 1
        };
        this.chart.update();
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
    this.chart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: []
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

    this.refresh();

    skygear.pubsub.on("vote", this.refresh);
  }

  render() {
    return (
      <canvas
        ref={ctx => {
          this.ctx = ctx;
        }}
      />
    );
  }
}

export default ResultsChart;
