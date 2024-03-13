import React from "react";
import { Modal } from "react-bootstrap";
import styles from "layout/LogoutModal.module.scss";

import { useDispatch } from "react-redux";
import { getStartSession } from "modules/session/features/sessionSlice";

const StartSessionModal = ({
  show,
  onHide,
  title = "Term and condition",
  session_key,
}) => {
  const dispatch = useDispatch();
  const handleStartSession = () => {
    let payload = {
      session_key: session_key,
    };
    dispatch(getStartSession(payload)).then(res => {
      onHide();
    });
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
          {/* <FiLogOut size={40} color="#D83D59" /> */}
          <h6 className={styles.title}>{title}</h6>
          <h6 style={{ marginTop: "10px" }}>
            {" "}
            Do you want to start the session?
          </h6>
          <button
            type="submit"
            className={`"btn ${styles.btnPrimary} boarder-0"`}
            onClick={handleStartSession}
          >
            Yes
          </button>
        </div>
        <div className="d-flex justify-content-end"></div>
      </Modal.Body>
    </Modal>
  );
};

export default StartSessionModal;
