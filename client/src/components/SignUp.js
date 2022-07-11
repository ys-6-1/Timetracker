import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
    password2: "",
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
    const { username, email, password, password2 } = formData;
    const newErrors = {};

    if (!username || username === "")
      newErrors.username = "Please provide the username";
    else if (username.length < 3)
      newErrors.username = "Username must be at least 3 letters long";

    if (!email || email === "")
      newErrors.email = "Please provide the email address";
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return (newErrors.email =
        "Email does not look right. Did you type it correctly?");

    if (!password || password === "")
      newErrors.password = "Please provide the password";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 letters long";

    if (!password2 || password2 === "")
      newErrors.password2 = "Please type in the password again";
    else if (password2.trim() !== password.trim())
      newErrors.password2 = "Password does not match";

    return newErrors;
  };

  const handleRegister = async () => {
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

    await createUser(formData);
  };

  return (
    <div className="form-container">
      <div className="form-top">
        <img className="form-logo" src={require("../assets/logo.png")} />
        <p>Welcome to TimeTracker</p>
        <p>Please register as a user</p>
      </div>

      <Form className="form-content">
        <Form.Group className="mb-3">
          <Form.Label className="label">User name</Form.Label>
          <Form.Control
            placeholder="User name"
            required
            onChange={(e) => handleChange("username", e.target.value)}
            name="username"
            value={formData.username || ""}
            className="form-input"
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label className="label">Password Confirmation</Form.Label>
          <Form.Control
            placeholder="Password Confirmation"
            required
            onChange={(e) => handleChange("password2", e.target.value)}
            name="password2"
            value={formData.password2 || ""}
            className="form-input"
            isInvalid={!!errors.password2}
            type="password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div className="form-bottom">
        <Button
          className="form-submit-btn"
          variant="primary"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </Button>
        <Link to="/login" className="form-link">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
