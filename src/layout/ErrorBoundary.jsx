import React, { useEffect } from "react";
import { BiRefresh } from "react-icons/bi";

import styles from "./ErrorBoundary.module.scss";

import isDev from "utils/isDev";

const Fallback = () => {
  useEffect(() => {
    const listener = () => window.location.reload();
    window.addEventListener("popstate", listener);
    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, []);

  return (
    <div className={styles.error_main}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <p className={[styles.went_wrong_text, "m-0"].join(" ")}>
            Something went Wrong!
          </p>
          <div
            className={[
              styles.try_main,
              "d-flex flex-column flex-nowrap align-items-center m-0",
            ].join(" ")}
          >
            <p className={styles.text}>Try Refreshing the page!</p>
            <div
              className={styles.refresh_btn}
              onClick={() => window.location.reload()}
            >
              <BiRefresh size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    if (!isDev()) {
      // only execute in production
    }
  }

  render() {
    if (this.state.hasError) {
      return <Fallback />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
