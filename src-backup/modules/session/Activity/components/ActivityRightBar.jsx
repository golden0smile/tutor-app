import React from "react";
import styles from "../AddActivity.module.scss";
import { closeIcon, coinIcon, mediaIcon } from "constants/images";
import classNames from "classnames";
import { getActivityType } from "modules/session/utils/getActivityType";
import { getDuration } from "modules/session/utils/getDuration";
import { noActivityMsg } from "constants/messages";

const ActivityRightBar = ({
  selectedData,
  handlerRemove,
  handleSubmit,
  isLoad,
  isDisable,
  handleGoBack,
}) => {
  const displayText =
    selectedData?.length > 1 ? "Add Activities" : "Add Activity";
  return (
    <div className={styles.selectedActivity}>
      <div className={styles.headerPart}>
        <div className={styles.headerTitle}>
          <div className={styles.title}>
            Selected activities
            {selectedData?.length ? `(${selectedData?.length})` : null}
          </div>
        </div>
        {selectedData?.length > 0 ? (
          selectedData?.map(item => {
            return (
              <div className={styles.activityBlock} key={item?.id}>
                <div className={styles.activityBlockWrapper}>
                  <div className={styles.blockWrapper}>
                    <div
                      className={styles.blockTitle}
                      dangerouslySetInnerHTML={{
                        __html: item?.name || "",
                      }}
                    />
                    <div className={styles.blockFooter}>
                      <div className={styles.assessment}>
                        <img src={mediaIcon} alt="" />
                        <div className={styles.title}>
                          {getActivityType(item?.type)}
                        </div>
                      </div>
                      <div className={styles.time}>
                        <div className={styles.title}>
                          {Array.isArray(item?.id)
                            ? item?.duration
                            : getDuration(item?.duration)}
                        </div>
                      </div>
                      <div className={styles.amount}>
                        <img src={coinIcon} alt="" />
                        <div className={styles.title}>
                          {item?.coin ? item.coin : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    src={closeIcon}
                    alt=""
                    onClick={() => handlerRemove(item)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noDataWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.title}>{noActivityMsg}</div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerPart}>
        <button
          disabled={isLoad || isDisable}
          type="button"
          className={styles.actionButton}
          onClick={handleSubmit}
        >
          {isLoad ? "Updating Activities..." : displayText}
        </button>
        <button
          type="button"
          className={classNames(styles.actionButton, styles.grayButton)}
          onClick={() => {
            handleGoBack();
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ActivityRightBar;
