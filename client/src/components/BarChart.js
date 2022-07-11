import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

function BarChart({ chartChecked, tempActionData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [maxLabel, setMaxLabel] = useState(0);
  const [tick, setTick] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [chartLength, setChartLength] = useState("7 days");

  const options = {
    chart: {
      type: "bar",
      fontFamily: "Nunito",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        formatter: function (val) {
          return moment(val).format("M/D");
        },
      },
      tickAmount: 10,
    },
    yaxis: {
      min: 0,
      max: maxLabel,
      tickAmount: tick,
      labels: {
        formatter: (val) => {
          return moment.utc(val * 1000).format("HH:mm");
        },
      },
    },
  };

  useEffect(() => {
    if (chartChecked.length > 0) {
      getBarData(chartChecked);
    }
  }, [chartChecked, pageIndex, chartLength, tempActionData]);

  const getBarData = async (categories) => {
    const dataArr = [];
    let maxDuration = 0;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      let result;
      if (chartLength === "30 days") {
        result = await fetch(
          `/actions/monthy/?category=${category.id}&page=${pageIndex}`
        );
      } else {
        result = await fetch(
          `/actions/weekly/?category=${category.id}&page=${pageIndex}`
        );
      }
      const data = await result.json();
      const formattedData = [];
      for (let j = 0; j < data.data.length; j++) {
        const el = data.data[j];
        formattedData.push({
          x: el.dt,
          y: el.duration,
        });
        maxDuration = maxDuration < el.duration ? el.duration : maxDuration;
      }
      dataArr.push({
        data: formattedData,
        type: "column",
        name: category.title,
      });
    }

    const max = (30 - ((maxDuration / 60) % 30) + maxDuration / 60) * 60;
    setMaxLabel(max);
    setTick(max > 3600 ? max / 1800 : max / 900);
    setFilteredData(dataArr);
  };
  const handleChange = (e) => {
    setChartLength(e.target.value);
    setPageIndex(0);
  };

  return (
    <div className="bar-chart">
      <div className="section">
        <span id="daily"></span>
        <h5>Daily Progress</h5>
        {chartChecked.length === 0 && (
          <p className="bar-chart-message">
            Please select category from Categories
          </p>
        )}
        {chartChecked.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Select
              className="option bar-chart-option"
              onChange={handleChange}
            >
              <option>7 days</option>
              <option>30 days</option>
            </Form.Select>
          </Form.Group>
        )}

        {chartChecked.length > 0 && filteredData[0] && (
          <Chart
            series={filteredData}
            options={{
              ...options,
              legend: {
                offsetY: filteredData[0].data.length === 7 ? 0 : -22,
                showForSingleSeries: true,
              },
            }}
            type="bar"
            height={`${filteredData[0].data.length === 7 ? 230 : 252}`}
          />
        )}
        {chartChecked.length > 0 && (
          <div className="pagination">
            <div className="pagination__prev">
              <p
                onClick={() => {
                  setPageIndex(pageIndex + 1);
                }}
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </p>
            </div>
            <div className="pagination__next">
              {pageIndex > 0 && (
                <p
                  onClick={() => {
                    setPageIndex(pageIndex - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleChevronRight} />
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarChart;
