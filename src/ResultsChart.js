import React from "react";
import Chart from "chart.js";
import skygear from "skygear";

const fakeAsyncOperation = data =>
  new Promise(resolve => setTimeout(resolve, 100, data));

class ResultsChart extends React.Component {
  componentDidMount() {
    const results = [
      {
        dish: "Buger",
        count: 12
      },
      {
        dish: "Char Siu",
        count: 5
      },
      {
        dish: "Noodles",
        count: 1
      },
      {
        dish: "Pizza",
        count: 6
      }
    ];

    fakeAsyncOperation(results).then(results => {
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
    });
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
