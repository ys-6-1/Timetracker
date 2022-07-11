import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Alert({
  setAlertIsShown,
  alertType,
  idForDelete,
  deleteCategory,
  deleteTemp,
  alertIsShown,
  syncCategoryDelete,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleClose = () => {
    setAlertIsShown(false);
  };
  const handleDelete = async () => {
    if (alertType === "Temp") await deleteTemp(idForDelete);
    if (alertType === "Category") await deleteCategory(idForDelete);
    syncCategoryDelete(idForDelete);

    setShowConfirmation(true);
    setTimeout(() => {
      setAlertIsShown(false);
    }, 500);
  };
  return (
    <div>
      <Modal show={alertIsShown} onHide={handleClose}>
        {showConfirmation && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>The entry was deleted successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
        {!showConfirmation && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete it?</Modal.Body>
            <Modal.Footer className="modal-footer">
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Alert;
