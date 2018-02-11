import React from "react";
import Chart from "chart.js";
import skygear from "skygear";

class ResultsChart extends React.Component {
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
                label: "# of Votes",
                data: results.map(result => result.count)
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      })
      .catch(error => console.error(error))
      .finally(this.props.onAsyncEnd);
  }

  componentDidMount() {
    this.refresh();
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
