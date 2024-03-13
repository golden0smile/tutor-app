import classNames from "classnames";

import styles from "./Loader.module.scss";

const Loader = ({ className }) => {
  return (
    <div className={classNames(styles.loader_wrap, className)}>
      <div className={styles.loader} />
    </div>
  );
};
export default Loader;
