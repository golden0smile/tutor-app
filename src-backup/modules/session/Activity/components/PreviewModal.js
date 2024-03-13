import React from "react";
import styles from "./PreviewModal.module.scss";
// import { RiErrorWarningLine } from "react-icons/ri";
import { PiWarningBold } from "react-icons/pi";

import { Button, Modal, ModalBody } from "reactstrap";
import classNames from "classnames";

const PreviewModal = ({
  show,
  onHide,
  msg = "Please log off Student App in this browser in order to Preview activity.",
  confirmation,
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
          <PiWarningBold size={70} color="#d8a73d" />
          <span className={styles.title}>Preview Confirmation</span>
          <h6 style={{ marginTop: "10px", textAlign: "center" }}>{msg}</h6>

          <div className={styles.btnDiv}>
            <Button
              type="submit"
              onClick={confirmation}
              className={classNames(styles.btnCustom, styles.btnPrimary)}
              disabled={isLoad}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PreviewModal;
