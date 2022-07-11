import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LogIn = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  useEffect(() => {
    setUser("");
  }, []);

  const initialFormData = Object.freeze({
    email: "",
    password: "",
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
    const { email, password } = formData;
    const newErrors = {};

    if (!email || email === "")
      newErrors.email = "Please provide the email address";

    if (!password || password === "")
      newErrors.password = "Please provide the password";

    return newErrors;
  };

  const handleLogIn = async () => {
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

    await loginUser(formData);
  };

  return (
    <div className="form-container">
      <div className="form-top">
        <img className="form-logo" src={require("../assets/logo.png")} />
        <p>Welcome back to TimeTracker!</p>
      </div>

      <Form className="form-content">
        <Form.Group className="mb-3">
          <Form.Label className="label">Email</Form.Label>
          <Form.Control
            placeholder="Email"
            required
            onChange={(e) => handleChange("email", e.target.value)}
            name="email"
            value={formData.email || ""}
            className="form-input"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            placeholder="Password"
            required
            onChange={(e) => handleChange("password", e.target.value)}
            name="password"
            value={formData.password || ""}
            className="form-input"
            isInvalid={!!errors.password}
            type="password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div className="form-bottom">
        <Button
          className="form-submit-btn"
          variant="primary"
          type="submit"
          onClick={handleLogIn}
        >
          Log in
        </Button>
        <Link to="/register" className="form-link">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
