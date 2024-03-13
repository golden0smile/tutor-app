import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./LogoutModal.module.scss";
import { logout } from "../modules/login/features/loginSlice";
import { useDispatch } from "react-redux";
import LocalStorage from "services/localStorage";
import Cookies from "services/cookies";
const LogoutModal = ({ show, onHide, title = "" }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    LocalStorage.clear();
    Cookies.clear();
    dispatch(logout());
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      className={styles.documentModal}
      // backdrop="static"
      centered
    >
      <Modal.Body className="p-4">
        <i
          onClick={onHide}
          className={`fa-regular fa-circle-xmark  opacity-100 cursor-pointer position-absolute  ${styles.translateMiddle} `}
        ></i>
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <h6 className={styles.title}>{title}</h6>
          <h6 style={{ marginTop: "10px" }}>
            {" "}
            Are you sure you want to log out?
          </h6>
          <button
            type="submit"
            className={`"btn ${styles.btnPrimary} boarder-0"`}
            onClick={handleLogout}
          >
            Yes
          </button>
        </div>
        <div className="d-flex justify-content-end"></div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
