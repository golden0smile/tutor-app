import React from "react";
import styles from "./DeleteModal.module.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { Button, Modal, ModalBody } from "reactstrap";
import classNames from "classnames";

const DeleteModal = ({
  show,
  onHide,
  msg = "Are you sure you want to delete this activity?",
  deleteConfirmation,
  isLoad,
}) => {
  return (
    <Modal
      centered
      isOpen={show}
      toggle={onHide}
      className={styles.documentModal}
      // backdrop="static"
    >
      <ModalBody className="p-4">
        <i
          onClick={onHide}
          className={`fa-regular fa-circle-xmark  opacity-100 cursor-pointer position-absolute  ${styles.translateMiddle} `}
        ></i>
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <RiErrorWarningLine size={70} color="#D83D59" />
          <span className={styles.title}>Delete Confirmation</span>
          <h6 style={{ marginTop: "10px" }}>{msg}</h6>

          <div className={styles.btnDiv}>
            <Button
              type="submit"
              onClick={deleteConfirmation}
              className={classNames(styles.btnCustom, styles.btnPrimary)}
              disabled={isLoad}
            >
              {isLoad ? "Deleting..." : "Yes"}
            </Button>
            <Button
              outline
              color="danger"
              onClick={onHide}
              className={classNames(styles.btnCustom)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
