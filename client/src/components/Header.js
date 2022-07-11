import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MobileMenu from "./MobileMenu";
import AuthContext from "../context/AuthContext";

function Header() {
  const { user, logoutUser, deleteAccount } = useContext(AuthContext);
  const [userSettingOpen, setUserSettingOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleOverlayClick = () => {
    setUserSettingOpen(false);
    // setNotificationOpen(false);
  };

  return (
    <nav className="header">
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={deleteAccount}>
            Delete
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => setModalShow(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title-container">
        <img alt="logo" src={require("../assets/logo.png")} />
        <p className="app-title">Time Tracker</p>
      </div>

      <div
        className="user-container"
        onClick={() => setUserSettingOpen(!userSettingOpen)}
      >
        <p>{user.user_name}</p>
        <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
      </div>

      {userSettingOpen && (
        <>
          <div
            className="overlay overlay--local"
            onClick={handleOverlayClick}
          ></div>
          <div className="mini-menu-container">
            <div className="mini-menu-content">
              <div className="mini-menu-text-container" onClick={logoutUser}>
                Logout
              </div>
              <div
                className="mini-menu-text-container"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Delete account
              </div>
            </div>
          </div>
        </>
      )}

      <MobileMenu />
    </nav>
  );
}

export default Header;
