import styles from "./Button.module.scss";
const Button = ({ label, onButtonClick }) => {
  return (
    <div
      onClick={() => onButtonClick()}
      className={styles.sessionCardDetailsButton}
    >
      <label>{label}</label>
    </div>
  );
};
const OutlineButton = ({ label, onButtonClick }) => {
  return (
    <div
      onClick={() => onButtonClick()}
      className={styles.sessionCardDetailsButtonOutline}
    >
      <label>{label}</label>
    </div>
  );
};
export { Button, OutlineButton };
