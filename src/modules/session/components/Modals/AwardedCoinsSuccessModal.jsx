import { checkMark, coin } from "constants/images";
import { Fragment } from "react";
import styles from "./ModalforAwardSession.module.scss";
import { useSelector } from "react-redux";

const AwardedCoinsSuccessModal = () => {
  const { awardCoinsDetails } = useSelector(state => state.session);
  return (
    <Fragment>
      <div className={styles.modalContainerTickSection}>
        <img style={{ objectFit: "contain" }} src={checkMark} alt="" />
        <label>Coins awarded</label>
      </div>
      <div className={styles.modalTable}>
        <div className={styles.modalTableTitle}>
          <div className={styles.modalTableTitleItem}>
            <label>Name</label>
          </div>
          <div className={styles.modalTableTitleItem}>
            <label>Coins</label>
          </div>
          <div className={styles.modalTableTitleItem}>
            <label>Reason</label>
          </div>
        </div>
        <div className={styles.modalTableColumns}>
          {awardCoinsDetails?.coins?.map((item, i) => {
            return (
              <div key={i} className={styles.modalTableColumnsItem}>
                <Fragment>
                  <label>{item?.student?.st_first_name}</label>
                </Fragment>
                <Fragment>
                  <img src={coin} alt="" />
                  <label>+{item?.coins_earned} Coins</label>
                </Fragment>

                <label>{item?.remarks}</label>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default AwardedCoinsSuccessModal;
