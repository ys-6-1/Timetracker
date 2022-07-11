import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

function Categories({
  categoryEl,
  categories,
  getActionDetails,
  setDetailsIsShown,
  setCurrCategory,
  setCategoryDetails,
  setTimerCategory,
  setFormIsShown,
  setAlertIsShown,
  setAlertType,
  setIdForDelete,
  chartChecked,
  setChartChecked,
  setOptionIsShown,
  setFilter,
  setOrder,
  setSearchQuery,
  setPage,
  topEl,
  setTempCategory,
}) {
  const [timerChecked, setTimerChecked] = useState(false);
  const searchInputEl = useRef(null);
  const chartSelectionLimit = 3;

  const handleEdit = async (category) => {
    setFormIsShown(true);
    setCurrCategory(category);
  };

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const handleCategoryDelete = (id) => {
    setAlertIsShown(true);
    setAlertType("Category");
    setIdForDelete(id);
  };

  const handleFilter = (e) => {
    if (e.target.value === "Create Date") setFilter("id");
    if (e.target.value === "Update Date") setFilter("updated_at");
    if (e.target.value === "Total Time") setFilter("total_time");
    if (e.target.value === "Title") setFilter("title");
  };

  const handleOrder = (e) => {
    if (e.target.value === "Ascending") setOrder("asc");
    else setOrder("desc");
  };

  return (
    <div className="categories" ref={categoryEl}>
      <span id="categories"></span>
      <div className="section">
        <h5>Categories</h5>
        <div className="option-container">
          <div className="create-btn-container">
            <Button onClick={handleEdit} className="create-button">
              New category
            </Button>
          </div>
          <Form.Group className="mb-3 category-search">
            <Form.Control
              placeholder="Search title"
              onChange={handleSearch}
              className="option"
              ref={searchInputEl}
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="search-close"
              onClick={() => {
                setSearchQuery("");
                searchInputEl.current.value = "";
              }}
            />
          </Form.Group>
        </div>
        <div className="option-container">
          <Form.Group className="mb-3">
            <Form.Select onChange={handleFilter} className="option">
              <option>Create Date</option>
              <option>Total Time</option>
              <option>Update Date</option>
              <option>Title</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select onChange={handleOrder} className="option">
              <option>Descending</option>
              <option>Ascending</option>
            </Form.Select>
          </Form.Group>
        </div>

        <table className="table categories-table">
          <thead className="table-head">
            <tr>
              <th>Title</th>
              <th>Timer</th>
              <th>Chart</th>
              <th className="total-time">Total</th>
            </tr>
          </thead>
          <tbody>
            {categories.result.map((category, i) => {
              let totalDuration = category.sum;
              const hours = Math.floor(category.sum / 3600);
              const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
              totalDuration -= hours * 3600;
              const minutes = Math.floor(totalDuration / 60);
              const formattedMinutes =
                minutes < 10 ? `0${minutes}` : `${minutes}`;
              totalDuration -= minutes * 60;
              const seconds = totalDuration;
              const formattedSeconds =
                seconds < 10 ? `0${seconds}` : `${seconds}`;

              return (
                <tr key={i}>
                  <td>{category.title}</td>
                  <td>
                    <Form.Check
                      checked={timerChecked === category.id}
                      type="checkbox"
                      name="timer-btn"
                      className="checkbox"
                      id="checkbox--timer"
                      onChange={() => {
                        if (timerChecked !== category.id) {
                          setTimerChecked(category.id);
                          setTimerCategory(category);
                          topEl?.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        } else {
                          setTimerChecked(undefined);
                          setTimerCategory(undefined);
                        }
                      }}
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      className="checkbox"
                      id="checkbox--chart"
                      onChange={() => {
                        if (chartChecked.some((el) => el.id === category.id)) {
                          setChartChecked(
                            chartChecked.filter((el) => el.id !== category.id)
                          );
                          return;
                        }
                        if (chartChecked.length === chartSelectionLimit) {
                          setOptionIsShown(true);
                          setTempCategory(category);
                          return;
                        } else {
                          setChartChecked([...chartChecked, category]);
                        }
                      }}
                      checked={chartChecked.some((el) => el.id === category.id)}
                    />
                  </td>

                  <td className="total-time">{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</td>
                  <td className="categories__icons">
                    <p
                      className="link"
                      onClick={async () => {
                        await getActionDetails(category.id);
                        setDetailsIsShown(true);
                        setCategoryDetails(category);
                      }}
                    >
                      Details
                    </p>
                    <p
                      className="link"
                      onClick={() => {
                        handleEdit(category);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </p>
                    <p
                      className="link"
                      onClick={() => {
                        handleCategoryDelete(category.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination__prev">
            {categories.prev && (
              <p
                onClick={() => {
                  setPage(categories.prev.page);
                }}
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </p>
            )}
          </div>
          <p className="pagination__page">Page {categories.page}</p>
          <div className="pagination__next">
            {categories.next && (
              <p
                onClick={() => {
                  setPage(categories.next.page);
                }}
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
