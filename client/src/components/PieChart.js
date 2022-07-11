import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Form from "react-bootstrap/Form";
import moment from "moment";

function PieChart({ pieData, setPieChartLength }) {
  const defaultThreshold = 2;
  const [threshold, setThreshold] = useState(defaultThreshold);
  const sum = pieData.reduce((accum, curr) => accum + curr[1], 0);
  const filteredData = pieData.filter((el) => el[1] / sum >= threshold / 100);
  const formattedSeries = filteredData.map((el) => el[1]);
  const formattedLabel = filteredData.map((el) => el[0]);
  const [options, setOptions] = useState({
    legend: {
      position: "bottom",
      fontFamily: "Nunito",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return moment.utc(val * 1000).format("HH:mm");
        },
      },
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  });
  const handleLength = (e) => {
    setPieChartLength(e.target.value);
  };

  useEffect(() => {
    setOptions({ ...options, labels: formattedLabel });
  }, [pieData, threshold]);

  return (
    <div className="pie-chart">
      <div className="section">
        <span id="breakdown"></span>
        <h5>Breakdown</h5>
        <div className="option-container">
          <Form.Group className="mb-3">
            <Form.Select className="option" onChange={handleLength}>
              <option>All</option>
              <option>Today</option>
              <option>7 days</option>
              <option>30 days</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" style={{ display: "none" }}>
            <Form.Select className="option">
              <option>All days</option>
              <option>Weekdays</option>
              <option>Weekends</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" style={{ marginLeft: "10px" }}>
            <div className="threshold-form">
              <Form.Text className="text-muted">Minimum: </Form.Text>
              <Form.Control
                className="option"
                type="number"
                min="0"
                max="100"
                onChange={(e) => {
                  setThreshold(e.target.value);
                }}
              />
              <Form.Text className="text-muted">%</Form.Text>
            </div>
          </Form.Group>
        </div>
        {pieData.length !== 0 && (
          <Chart
            options={options}
            series={formattedSeries}
            type="pie"
            height="300"
          />
        )}
        {(pieData === undefined ||
          pieData.length === 0 ||
          formattedSeries.length === 0) && (
          <p className="pie-chart-message">
            No maching data for the selected conditions.
          </p>
        )}
      </div>
    </div>
  );
}

export default PieChart;
