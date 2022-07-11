import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CreateForm({
  currCategory,
  setFormIsShown,
  getCategories,
  chartChecked,
  setChartChecked,
  syncCategoryData,
}) {
  // const [users, setUsers] = useState([]);
  const inputEl = useRef(null);
  // const [validated, setValidated] = useState(false);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const initialFormData = Object.freeze({
    title: currCategory ? currCategory.title : "",
    description: currCategory ? currCategory.description : "",
    public: currCategory ? currCategory.public : false,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    const { title, description } = formData;
    const newErrors = {};

    if (!title || title === "")
      newErrors.title = "Please provide the title of the category";

    if (description?.length > 32)
      newErrors.description = "Description cannot exceed 32 character length";

    return newErrors;
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    for (const key in formData) {
      if (formData[key]) {
        formData[key] = formData[key].trim();
      }
    }

    await fetch(`/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormIsShown(false);
    getCategories();
  };

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/categories/${currCategory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (chartChecked.some((el) => el.id === currCategory.id)) {
      const updated = chartChecked.map((el) => {
        if (el.id === currCategory.id) return { id: el.id, ...formData };
        return el;
      });
      setChartChecked(updated);
    }
    syncCategoryData({ id: currCategory.id, ...formData });
    setFormIsShown(false);
  };

  const handleClose = () => {
    setFormIsShown(false);
  };

  return (
    <div className="container">
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title of category"
                required
                onChange={(e) => handleChange("title", e.target.value)}
                name="title"
                value={formData.title || ""}
                className="form-input"
                ref={inputEl}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the category"
                onChange={(e) => handleChange("description", e.target.value)}
                name="description"
                value={formData.description || ""}
                className="form-input"
                maxLength="33"
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              if (currCategory.id) handleCategoryUpdate(e);
              else handleCategorySubmit(e);
            }}
          >
            {currCategory.id === undefined ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateForm;
