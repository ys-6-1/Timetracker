import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

function Latest({
  tempActionData,
  updatedDuration,
  setUpdatedDuration,
  handleTempDelete,
  getTemps,
  updateAction,
  syncActionData,
}) {
  const inputEl = useRef(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rowToEdit, setRowToEdit] = useState(undefined);

  useEffect(() => {
    if (updatedDuration > 0) {
      let total = updatedDuration;
      const hoursResult = Math.floor(total / 3600);
      setHours(hoursResult);
      total -= hoursResult * 3600;

      const minutesResult = Math.floor(total / 60);
      setMinutes(minutesResult);
      total -= minutesResult * 60;

      const secondsResult = total;
      setSeconds(secondsResult);
    }
  }, [updatedDuration]);

  useEffect(() => {
    if (inputEl.current) inputEl.current.focus();
  }, [rowToEdit]);

  const handleEditSave = async (tempId, updatedTime) => {
    const tempEntry = await fetch(`/temps/${tempId}`);
    const tempData = await tempEntry.json();
    const actionId = tempData.data.action_id;
    const prevDuration = tempData.data.duration;

    const update = { duration: updatedTime };
    await fetch(`/temps/${tempId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const targetAction = await fetch(`/actions/${actionId}`);
    const { data } = await targetAction.json();
    data.duration = Number(data.duration) - Number(prevDuration) + updatedTime;
    await updateAction(data, actionId);
    syncActionData();
  };

  const validateInput = () => {
    const isSecondValid = /^[0-5]?[0-9]$/.test(seconds);
    const isMinuteValid = /^[0-5]?[0-9]$/.test(minutes);
    const isHourValid = /^[0-1]?[0-9]|2[0-3]$/.test(hours);
    if (isSecondValid && isMinuteValid && isHourValid) return true;
    return false;
  };

  const handleSave = async (el, i) => {
    const isInputValid = validateInput();
    if (!isInputValid) {
      alert("Plese enter valid number");
      return;
    }
    const updatedTime =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    await setUpdatedDuration(updatedTime);
    await handleEditSave(el.id, updatedTime);
    setRowToEdit(undefined);
  };

  return (
    <div className="section">
      <span id="latests"></span>
      <h5>Latest activities</h5>
      <div className="overflow-container">
        <table className="table table__latest">
          <thead className="table-head">
            <tr>
              <td>Date</td>
              <td>Category</td>
              <td colSpan="6">Duration</td>
            </tr>
          </thead>
          <tbody>
            {tempActionData.map((el, i) => (
              <tr key={i}>
                <td>{moment(el.date).format("LL")}</td>
                <td>{el.title}</td>
                {rowToEdit !== i && (
                  <td colSpan="6">
                    {moment.utc(el.duration * 1000).format("HH:mm:ss") || 0}
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--input">
                    {
                      <input
                        type="text"
                        onChange={(e) => setHours(e.target.value)}
                        value={hours}
                        ref={inputEl}
                        pattern="([01]?[0-9]|2[0-3])"
                      />
                    }
                  </td>
                )}

                {rowToEdit === i && (
                  <td className="table__latest--input">
                    <p>:</p>
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--input">
                    {
                      <input
                        type="text"
                        onChange={(e) => setMinutes(e.target.value)}
                        value={minutes}
                        ref={inputEl}
                        pattern="([0-5][0-9])"
                      />
                    }
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--input">
                    <p>:</p>
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--input">
                    {
                      <input
                        type="text"
                        onChange={(e) => setSeconds(e.target.value)}
                        value={seconds}
                        ref={inputEl}
                        pattern="([0-5][0-9])"
                      />
                    }
                  </td>
                )}
                {rowToEdit !== i && (
                  <td>
                    <p
                      className="link"
                      onClick={() => {
                        setRowToEdit(i);
                        setUpdatedDuration(tempActionData[i].duration);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </p>
                  </td>
                )}
                {rowToEdit !== i && (
                  <td>
                    <p
                      className="link"
                      onClick={() => {
                        handleTempDelete(el.id, el.category_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </p>
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--option" colSpan="4">
                    <p className="link" onClick={() => handleSave(el, i)}>
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </p>
                  </td>
                )}
                {rowToEdit === i && (
                  <td className="table__latest--option">
                    <p
                      className="link"
                      onClick={() => {
                        setRowToEdit(undefined);
                      }}
                    >
                      &times;
                    </p>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Latest;
