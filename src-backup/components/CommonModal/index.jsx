import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./CommonModal.module.scss";
import classNames from "classnames";
function CommonModal({
  show,
  hide,
  title,
  modalBody,
  btnPrimary,
  btnPrimary2,
  cancelBtn,
  closeModal,
  isFooter = true,
  isDisable = false,
  onClickbtnPrimary2,
  btnPrimaryClassName,
  btnPrimary2ClassName,
  cancelBtnClassName,
  footerClassName,
}) {
  return (
    <div>
      <Modal
        className={styles.modalContainer}
        centered
        isOpen={show}
        toggle={closeModal}
      >
        <ModalHeader toggle={closeModal}>
          <label className={styles.modalTitle}>{title}</label>
        </ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        {isFooter ? (
          <ModalFooter className={footerClassName}>
            {btnPrimary && (
              <Button
                color="danger"
                onClick={() => hide(0)}
                disabled={isDisable}
                className={classNames(styles.btn, btnPrimaryClassName)}
              >
                {btnPrimary}
              </Button>
            )}

            {btnPrimary2 && (
              <Button
                className={classNames(styles.btn, btnPrimary2ClassName)}
                color="danger"
                onClick={() => hide(1)}
              >
                {btnPrimary2}
              </Button>
            )}

            {cancelBtn && (
              <Button
                outline
                color="danger"
                onClick={hide}
                className={classNames(styles.btn, cancelBtnClassName)}
              >
                {cancelBtn}
              </Button>
            )}
          </ModalFooter>
        ) : null}
      </Modal>
    </div>
  );
}

export default CommonModal;
