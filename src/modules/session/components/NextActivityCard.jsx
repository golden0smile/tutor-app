import React, { useState } from "react";
import { getDuration } from "../utils/getDuration";
import { getActivityType } from "../utils/getActivityType";
import styles from "./NextActivityCard.module.scss";
import { closeIcon, coinIcon, mediaIcon } from "constants/images";

const NextActivityCard = ({
  items,
  handlerRemove,
  type,
  handleAddNextActivity,
}) => {
  const item = items?.length > 0 ? items[0] : [];
  const isAssessment = +type === 0 ? true : false;
  const [isAddBtn, setIsAddBtn] = useState(true);

  return (
    <div
      className={styles.activityBlock}
      key={
        isAssessment ? item?.activity_node_id : item?.pk_tutor_library_item_id
      }
    >
      <div className={styles.activityBlockWrapper}>
        <div className={styles.blockWrapper}>
          <div className={styles.blockTitle}>
            {isAssessment ? item?.node_name : item?.name}
          </div>
          <div className={styles.blockFooter}>
            <div className={styles.assessment}>
              <img src={mediaIcon} alt="" />
              <div className={styles.title}>{getActivityType(type)}</div>
            </div>
            <div className={styles.time}>
              <div className={styles.title}>{getDuration(item?.duration)}</div>
            </div>
            <div className={styles.amount}>
              <img src={coinIcon} alt="" />
              <div className={styles.title}>
                {item?.coins ? item.coins : "-"}
              </div>
            </div>
          </div>
        </div>
        {isAddBtn ? (
          <button
            className={styles.addBtn}
            onClick={() => {
              handleAddNextActivity(item, type);
              setIsAddBtn(false);
            }}
          >
            Add
          </button>
        ) : null}
        <img
          src={closeIcon}
          alt=""
          onClick={() => handlerRemove(item)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NextActivityCard;
