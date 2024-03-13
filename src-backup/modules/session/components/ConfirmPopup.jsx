import React from "react";
import { Modal } from "react-bootstrap";
import styles from "layout/LogoutModal.module.scss";
const ConfirmPopup = ({ show, onHide, title, onConfirm, message }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className={styles.documentModal}
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
          <h6 style={{ marginTop: "10px" }}> {message}</h6>
          <button
            type="submit"
            className={`"btn ${styles.btnPrimary} boarder-0"`}
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
        <div className="d-flex justify-content-end"></div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmPopup;
