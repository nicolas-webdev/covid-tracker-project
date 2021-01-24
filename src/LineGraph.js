import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

// The Actual Component !!!
function LineGraph({ casesType = "cases", className }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          // buildChartData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  const setColor = (casesType) => {
    switch (casesType) {
      case "recovered":
        return {
          backgroundColor: "rgba(125, 215, 29, 0.5)",
          borderColor: "#7dd71d",
        };
        break;
      case "deaths":
        return {
          backgroundColor: "rgba(153, 67, 251, 0.5)",
          borderColor: "#9043fb",
        };
        break;

      default:
        return {
          backgroundColor: "rgba(204, 16, 52, 0.5)",
          borderColor: "#CC1034",
        };
        break;
    }
  };

  return (
    <div className={className}>
      {data?.length > 0 && (
        <Line
          className="lineGraph__line"
          data={{
            datasets: [
              {
                backgroundColor: setColor(casesType).backgroundColor,
                borderColor: setColor(casesType).backgroundColor.borderColor,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
