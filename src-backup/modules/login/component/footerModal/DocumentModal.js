import React from "react";
import { Modal, ModalBody } from "reactstrap";

import styles from "./Document.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import moment from "moment";

const DocumentModal = ({
  show,
  onHide,
  title,
  logoImage,
  mode,
  onConfirm,
  isButton,
}) => {
  const modalContent = useSelector(state => state.login?.modalContent);
  const handleAccept = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={show}
      toggle={onHide}
      className={styles.documentModal}
      centered
    >
      <ModalBody className="p-4">
        <i
          onClick={onHide}
          className={`fa-solid fa-x  opacity-100 position-absolute  ${styles.translateMiddle} `}
        ></i>

        <div className={classNames("d-flex", styles.title)}>
          <div className={styles.imgDiv}>
            <img src={logoImage} alt="term&privacy" />
          </div>
          <div className={styles.textDiv}>
            <span className={styles.mainHead}>
              {modalContent?.content_title}
            </span>
            <span>
              Last modified{" "}
              {moment(modalContent?.updated_on).format("MMMM YYYY")}
            </span>

            <span></span>
          </div>
        </div>
        <h4 className="text-center mt-2">{modalContent?.content_subject}</h4>
        <div
          className={classNames(
            styles.contentDiv,
            isButton ? styles.mb_25 : "",
          )}
          dangerouslySetInnerHTML={{ __html: modalContent?.content_details }}
        >
          {/* The End User Licensing Agreement will be ready shortly.
          <br />
          Thanks for your understanding.
          <br />
          Best Regards Management, myGooRoo Pte Ltd */}
        </div>
        {isButton ? (
          <div className="d-flex justify-content-end">
            <button
              type="cancel"
              className={classNames(styles.btnSecondary)}
              onClick={onHide}
            >
              Decline
            </button>
            <button
              type="submit"
              className={classNames(styles.btnPrimary)}
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        ) : null}
      </ModalBody>
    </Modal>
  );
};

export default DocumentModal;
