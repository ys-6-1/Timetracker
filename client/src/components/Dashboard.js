import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Categories from "./Categories";
import CreateForm from "./Form";
import Details from "./Details";
import Timer from "./Timer";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Alert from "./Alert";
import Latest from "./Latest";
import ReplaceModal from "./ReplaceModal";

function Dashboard() {
  const [categories, setCategories] = useState({ result: [], page: 1 });
  const [detailsIsShown, setDetailsIsShown] = useState(false);
  const [actionDetails, setActionDetails] = useState(undefined);
  const [tempActionData, setTempActionData] = useState([]);
  const [formIsShown, setFormIsShown] = useState(false);
  const [currCategory, setCurrCategory] = useState(undefined);
  const [categoryDetails, setCategoryDetails] = useState(undefined);
  const [updatedDuration, setUpdatedDuration] = useState(0);
  const [page, setPage] = useState(1);
  const [pieData, setPieData] = useState(undefined);
  const [alertIsShown, setAlertIsShown] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [idForDelete, setIdForDelete] = useState(undefined);
  const [currCategoryId, setCurrCategoryId] = useState("");
  const [timerCategory, setTimerCategory] = useState(undefined);
  const [duration, setDuration] = useState(0);
  const [chartChecked, setChartChecked] = useState([]);
  const [optionIsShown, setOptionIsShown] = useState(false);
  const [filter, setFilter] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [tempCategory, setTempCategory] = useState(undefined);
  const [pieChartLength, setPieChartLength] = useState("All");
  const topEl = useRef(null);
  const categoryEl = useRef(null);

  useEffect(() => {
    setData();
  }, []);
  useEffect(() => {
    getPieData(pieChartLength);
  }, [categories, pieChartLength]);
  useEffect(() => {
    getCategories();
  }, [searchQuery, filter, order, page]);

  const setData = async () => {
    const data = await getCategories();
    if (data.result.length > 0) {
      setChartChecked([data.result.at(0)]);
    }
    await getTemps();
  };

  const syncActionData = async () => {
    await getCategories();
    await getTemps();
    if (detailsIsShown) {
      getActionDetails(categoryDetails.id);
    }
  };

  const syncCategoryData = async (newCategory) => {
    await getCategories();
    if (newCategory.id === timerCategory.id) {
      setTimerCategory(newCategory);
    }
    if (detailsIsShown && newCategory.id === categoryDetails.id) {
      setCategoryDetails(newCategory);
    }
  };

  const syncCategoryDelete = (idForDelete) => {
    if (idForDelete === timerCategory?.id) {
      setTimerCategory(undefined);
    }
    if (detailsIsShown && idForDelete === categoryDetails?.id) {
      setDetailsIsShown(false);
    }
  };

  const getPieData = async (length) => {
    const result = await fetch(`/actions/week-total/?length=${length}`);
    const { data } = await result.json();
    const dataInput = [];
    data.forEach((el) => dataInput.push([el.title, +el.sum]));
    setPieData(dataInput);
  };

  const getCategories = async () => {
    let result;
    let urlQuery = "";
    if (searchQuery) urlQuery += `search=${searchQuery}`;
    if (page) {
      urlQuery += `&page=${page}`;
      setPage(page);
    }
    if (filter) urlQuery += `&column=${filter}`;
    if (order) urlQuery += `&direction=${order}`;
    result = await fetch(`/categories?${urlQuery}`);
    const { data } = await result.json();
    setCategories(data);
    return data;
  };

  const getTemps = async () => {
    const tempResult = await fetch(`/temps/`);
    const tempData = await tempResult.json();
    setTempActionData(tempData.data);
  };

  const getActionDetails = async (categoryId) => {
    const actionResult = await fetch(`/actions/?category=${categoryId}`);
    const actionDetails = await actionResult.json();
    setActionDetails(actionDetails.data);
  };

  const deleteCategory = async (categoryId) => {
    setAlertIsShown(true);
    await fetch(`/categories/${categoryId}`, {
      method: "DELETE",
    });
    setData({ page });
  };
  const handleTempDelete = async (id, categoryId) => {
    setAlertIsShown(true);
    setAlertType("Temp");
    setIdForDelete(id);
    await getActionDetails(categoryId);
  };

  const deleteTemp = async (tempId) => {
    const target = tempActionData.find((el) => el.id === tempId);
    const actionId = target.action_id;
    const targetAction = actionDetails.list.find((el) => el.id === actionId);
    targetAction.duration -= target.duration;

    await fetch(`/temps/${tempId}`, {
      method: "DELETE",
    });
    await updateAction(targetAction, actionId);

    await getTemps();
    syncActionData();
  };

  const saveOrUpdateAction = async (newAction, categoryId) => {
    let latestAction, latestDay;
    const today = moment(new Date());

    const result = await fetch(`/actions/?category=${categoryId}&latest=true`);
    const json = await result.json();
    latestAction = json.data;
    if (latestAction) {
      latestDay = moment(latestAction.date);
    }
    if (latestAction && latestDay.isSame(today, "day")) {
      latestAction.duration += Math.round(duration / 1000);
      return updateAction(latestAction, latestAction.id);
    } else {
      return saveAction(newAction);
    }
  };

  const saveAction = async (newAction) => {
    const result = await fetch(`/actions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAction),
    });
    const parsedResult = await result.json();
    return parsedResult.data.id;
  };

  const updateAction = async (update, actionId) => {
    const result = await fetch(`/actions/${actionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    const parsedResult = await result.json();
    return parsedResult.data.id;
  };

  const moveToCategories = () => {
    window.scrollTo(0, categoryEl.current.offsetTop - 90);
  };
  return (
    <div className="dashboard">
      {alertIsShown && (
        <Alert
          alertType={alertType}
          setAlertIsShown={setAlertIsShown}
          deleteCategory={deleteCategory}
          deleteTemp={deleteTemp}
          idForDelete={idForDelete}
          alertIsShown={alertIsShown}
          currCategoryId={currCategoryId}
          syncCategoryDelete={syncCategoryDelete}
        />
      )}
      {optionIsShown && (
        <ReplaceModal
          setOptionIsShown={setOptionIsShown}
          chartChecked={chartChecked}
          setChartChecked={setChartChecked}
          optionIsShown={optionIsShown}
          tempCategory={tempCategory}
        />
      )}
      <div className="main-container" ref={topEl}>
        <Timer
          duration={duration}
          setDuration={setDuration}
          timerCategory={timerCategory}
          saveOrUpdateAction={saveOrUpdateAction}
          getTemps={getTemps}
          categories={categories}
          moveToCategories={moveToCategories}
          syncActionData={syncActionData}
        />
        {detailsIsShown && (
          <div className="card-custom card-custom__details">
            <Details
              currCategory={currCategory}
              categoryDetails={categoryDetails}
              actionDetails={actionDetails}
              setDetailsIsShown={setDetailsIsShown}
            />
          </div>
        )}
        <div className="inner-container">
          <div className="column">
            <div className="card-custom card-custom__chart">
              <BarChart
                chartChecked={chartChecked}
                tempActionData={tempActionData}
              />
            </div>

            {pieData && (
              <div className="card-custom card-custom__chart card-custom__chart--pie">
                <PieChart
                  pieData={pieData}
                  setPieChartLength={setPieChartLength}
                />
              </div>
            )}
          </div>
          <div className="column">
            <div className="card-custom card-custom__categories">
              <Categories
                categoryEl={categoryEl}
                formIsShown={formIsShown}
                categories={categories}
                setDetailsIsShown={setDetailsIsShown}
                setCurrCategory={setCurrCategory}
                setCategoryDetails={setCategoryDetails}
                getActionDetails={getActionDetails}
                setTimerCategory={setTimerCategory}
                setFormIsShown={setFormIsShown}
                setAlertIsShown={setAlertIsShown}
                setAlertType={setAlertType}
                setIdForDelete={setIdForDelete}
                getCategories={getCategories}
                chartChecked={chartChecked}
                setChartChecked={setChartChecked}
                setOptionIsShown={setOptionIsShown}
                setFilter={setFilter}
                setOrder={setOrder}
                setSearchQuery={setSearchQuery}
                setPage={setPage}
                topEl={topEl}
                setTempCategory={setTempCategory}
              />
            </div>

            <div className="card-custom card-custom__latest">
              <Latest
                tempActionData={tempActionData}
                updatedDuration={updatedDuration}
                setUpdatedDuration={setUpdatedDuration}
                handleTempDelete={handleTempDelete}
                getTemps={getTemps}
                updateAction={updateAction}
                syncActionData={syncActionData}
              />
            </div>
          </div>
        </div>
      </div>

      {formIsShown === true && (
        <CreateForm
          currCategory={currCategory}
          setFormIsShown={setFormIsShown}
          getCategories={getCategories}
          chartChecked={chartChecked}
          setChartChecked={setChartChecked}
          syncCategoryData={syncCategoryData}
        />
      )}
    </div>
  );
}

export default Dashboard;
