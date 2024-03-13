import ScheduledSession from "./ScheduledSession";
import styles from "./DayViewComponent.module.scss";
const NoEvent = () => {
  return <div className={styles.noEventWrapper}>No sessions scheduled</div>;
};
const DayViewComponent = ({ event }) => {
  return (
    <div className={styles.dayViewComponentContainer}>
      {(!Array.isArray(event) || event?.length === 0) && <NoEvent />}
      {Array.isArray(event) &&
        event?.map((item, key) => {
          return (
            <div className={styles.dayViewItem}>
              <div className={styles.dayViewHeader}>
                <label className={styles.dayViewHeaderLabel}>
                  {item?.startTime} - {item?.endTime}
                </label>
                <label className={styles.dayViewHeaderLabel}>
                  {item?.duration}
                </label>
              </div>
              <ScheduledSession eventDetails={item} isDay={true} />
            </div>
          );
        })}
    </div>
  );
};
export default DayViewComponent;
