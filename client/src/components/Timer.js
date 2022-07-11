import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import moment from "moment";

function Timer({
  timerCategory,
  duration,
  setDuration,
  saveOrUpdateAction,
  getTemps,
  moveToCategories,
  syncActionData,
}) {
  const [startTime, setStartTime] = useState(undefined);
  const [timerIsOn, setTimerIsOn] = useState(false);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (startTime === undefined) return;
    if (timerIsOn) {
      setTimer(
        setInterval(() => {
          if (duration === undefined) {
            setDuration(new Date() - startTime);
          } else {
            const temp = new Date() - startTime;
            setDuration(+duration + temp);
          }
        }, 1000)
      );
    }
  }, [timerIsOn]);

  const clearTimer = () => {
    setDuration(0);
    clearInterval(timer);
    setTimerIsOn(false);
  };

  const saveTemp = async (newAction, actionId, categoryId) => {
    newAction.action_id = actionId;
    await fetch(`/temps/?category=${categoryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAction),
    });
  };

  const handleSave = async () => {
    clearTimer();
    const newAction = {
      user_id: 1,
      category_id: timerCategory.id,
      duration: Math.round(duration / 1000),
      date: new Date().toISOString(),
    };
    const actionId = await saveOrUpdateAction(newAction, timerCategory.id);
    await saveTemp(newAction, actionId, timerCategory.id);
    syncActionData();
  };

  return (
    <div className="card-custom card-custom__timer" id="timer">
      <h5 className="timer-top">
        {timerCategory !== undefined
          ? `Tracking time of ${timerCategory.title}`
          : `Start tracking time by`}
      </h5>
      {timerCategory === undefined && (
        <p className="timer-top timer-top__link" onClick={moveToCategories}>
          selecting category
        </p>
      )}
      {timerCategory !== undefined && (
        <p className="timer-top timer-top__link" onClick={moveToCategories}>
          Switch category
        </p>
      )}
      <p className="timer-clock">
        {moment.utc(duration).format("HH:mm:ss") || 0}
      </p>
      <div className="timer-btns">
        {timerCategory === undefined && (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                To start a timer, please select a category or create a new one
              </Tooltip>
            }
          >
            <div className="btn-wrapper">
              <Button
                disabled
                className="btn-toggle"
                style={{ pointerEvents: "none" }}
              >
                Start
              </Button>
            </div>
          </OverlayTrigger>
        )}
        {timerCategory !== undefined && (
          <div className="btn-wrapper">
            <Button
              className="btn-toggle"
              onClick={() => {
                if (timerIsOn) {
                  clearInterval(timer);
                }
                setStartTime(new Date());
                setTimerIsOn(!timerIsOn);
              }}
            >
              {timerIsOn ? "Stop" : "Start"}
            </Button>
          </div>
        )}
        {timerCategory === undefined && (
          <div className="btn-wrapper">
            <Button disabled>Cancel</Button>
          </div>
        )}
        {timerCategory !== undefined && (
          <div className="btn-wrapper">
            <Button onClick={clearTimer}>Cancel</Button>
          </div>
        )}
        {duration === 0 && (
          <div className="btn-wrapper">
            <Button disabled className="btn-save">
              Save time
            </Button>
          </div>
        )}
        {duration !== 0 && (
          <div className="btn-wrapper">
            <Button className="btn-save" onClick={() => handleSave()}>
              Save time
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
