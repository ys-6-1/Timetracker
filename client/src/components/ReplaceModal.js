import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ReplaceModal({
  setOptionIsShown,
  chartChecked,
  setChartChecked,
  optionIsShown,
  tempCategory,
}) {
  const [currId, setCurrId] = useState(undefined);
  const handleClose = () => {
    setOptionIsShown(false);
  };
  const handleReplace = (i) => {
    const filtered = chartChecked
      .slice(0, i)
      .concat(chartChecked.slice(i + 1))
      .concat(tempCategory);
    setChartChecked(filtered);
    handleClose();
  };
  return (
    <div>
      <Modal show={optionIsShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="replacement-container">
            <p>
              Categories may be selected up to 3. Replace one of the currently
              selected category?
            </p>
            {chartChecked.map((el, i) => (
              <div key={i} className="replacement-option">
                <Form.Check
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => setCurrId(i)}
                  checked={currId === i}
                />
                <Form.Label>{el.title}</Form.Label>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="primary" onClick={() => handleReplace(currId)}>
            Replace
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReplaceModal;
