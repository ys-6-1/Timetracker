import React, { useEffect } from "react";
import moment from "moment";

function Details({ categoryDetails, actionDetails, setDetailsIsShown }) {
  const handleClose = () => {
    setDetailsIsShown(false);
  };
  useEffect(() => {}, [categoryDetails]);
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
                  {moment
                    .utc(actionDetails.totalTime * 1000)
                    .format("HH:mm:ss")}
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
