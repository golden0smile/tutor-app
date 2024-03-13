import classNames from "classnames";
import React from "react";
import styles from "./UserDetail.module.scss";
import UserCommonBtn from "./common/UserCommonBtn";
import { useSelector } from "react-redux";
import moment from "moment";

const UserDetails = ({ setStep, setTab }) => {
  const { userDetails } = useSelector(state => state.login);

  return (
    <div className={classNames(styles.main_container, "container")}>
      <div className={classNames(styles.detail_container, "container")}>
        <span className={classNames(" mb-3 fw-bold", styles.fs_18)}>
          Before we proceed, please check your details
        </span>
        <span className={classNames("mb-3 ", styles.fs_14)}>
          Please notify your admin immediately if the information is not
          accurate.
        </span>

        <div className={styles.infoSection}>
          <span className={classNames("fw-bold")}>Personal Information</span>

          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Salutation
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_salutation
                  ? userDetails?.tutor?.tut_salutation
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                First Name
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_fname
                  ? userDetails?.tutor?.tut_fname
                  : "-"}
              </div>
            </div>
          </div>
          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Last Name
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_surname
                  ? userDetails?.tutor?.tut_surname
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Birth Date
              </div>
              <div className={styles.textSecondary}>
                {moment(userDetails?.tutor?.tut_dob).format("D MMM YYYY")}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <span>Address Information</span>

          <div
            className={classNames(styles.addressSection, styles.innerSection)}
          >
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Address
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_address
                  ? userDetails?.tutor?.tut_address
                  : "-"}
              </div>
            </div>
            {/* <div>
              <div className={classNames("", styles.salutation_inner)}>
                Country
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.country_name
                  ? userDetails?.tutor?.country_name
                  : "-"}
              </div>
            </div> */}
          </div>
          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Country
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.country_name
                  ? userDetails?.tutor?.country_name
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                State
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_state
                  ? userDetails?.tutor?.tut_state
                  : "-"}
              </div>
            </div>
          </div>
          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                City
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_city
                  ? userDetails?.tutor?.tut_city
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Postcode
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_zip
                  ? userDetails?.tutor?.tut_zip
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <span>Contact Information</span>

          <div className={classNames("", styles.innerSection)}>
            <div>
              <div>Home Phone</div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_home_phone
                  ? userDetails?.tutor?.tut_home_phone
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Work Phone
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_work_phone
                  ? userDetails?.tutor?.tut_work_phone
                  : "-"}
              </div>
            </div>
          </div>
          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Mobile
              </div>
              <div className={styles.textSecondary}>
                {}
                {userDetails?.tutor?.tut_mobile
                  ? userDetails?.tutor?.tut_mobile
                  : "-"}
              </div>
            </div>
            <div>
              <div className={classNames("", styles.salutation_inner)}>
                Email
              </div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_emailid
                  ? userDetails?.tutor?.tut_emailid
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <span>About Tutor</span>

          <div className={classNames("", styles.innerSection)}>
            <div>
              <div className={styles.textSecondary}>
                {userDetails?.tutor?.tut_notes
                  ? userDetails?.tutor?.tut_notes
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        <div className={classNames("mb-3", styles.btnDiv)}>
          <UserCommonBtn
            setStep={setStep}
            setTab={setTab}
            step={1}
            btn1_text="Back"
            btn2_text="Next"
            isBackBtn={false}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
