import React, { useEffect, useState } from "react";
import moment from "moment";

function Details({ categoryDetails, actionDetails, setDetailsIsShown }) {
  const [formattedHours, setFormattedHours] = useState("");
  const [formattedMinutes, setFormattedMinutes] = useState("");
  const [formattedSeconds, setFormattedSeconds] = useState("");

  const handleClose = () => {
    setDetailsIsShown(false);
  };
  const formatTime = () => {
    let totalDuration = actionDetails.totalTime;
    const hours = Math.floor(actionDetails.totalTime / 3600);
    setFormattedHours(hours < 10 ? `0${hours}` : `${hours}`);
    totalDuration -= hours * 3600;
    const minutes = Math.floor(totalDuration / 60);
    setFormattedMinutes(minutes < 10 ? `0${minutes}` : `${minutes}`);
    totalDuration -= minutes * 60;
    const seconds = totalDuration;
    setFormattedSeconds(seconds < 10 ? `0${seconds}` : `${seconds}`);
  };

  useEffect(() => {
    formatTime();
  }, [categoryDetails]);

  return (
    <div className="section">
      <div className="details">
        <h5>Details</h5>

        <div className="details-content">
          <div className="details-head">
            <p className="close-btn" onClick={handleClose}>
              &times;
            </p>
            <h5>{categoryDetails.title}</h5>
            <p>{categoryDetails.description}</p>
          </div>
          <table className="table table__summary">
            <tbody>
              <tr>
                <td>Total time spent:</td>
                <td>
                  {`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
                </td>
              </tr>
              <tr>
                <td>Last worked on:</td>
                <td>
                  {actionDetails.lastEngaged
                    ? moment(actionDetails.lastEngaged).format("LL")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Total days:</td>
                <td>
                  {actionDetails.totalDays ? actionDetails.totalDays : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Start day:</td>
                <td>
                  {actionDetails.startedOn
                    ? moment(actionDetails.startedOn).format("LL")
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
