import React, { useState } from "react";
import classNames from "classnames";
import {
  companyLogoWithName,
  openEnvelop,
  privacyIcon,
  termCondition,
  unlock,
  warningIcon,
} from "constants/images";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  changeIsOldUser,
  getTermConditionOrPrivacyContent,
  getTutorAllDetail,
  setTermCondition,
  tutorLogin,
} from "../features/loginSlice";
import DocumentModal from "./footerModal/DocumentModal";
import styles from "./loginPage.module.scss";
import { toast } from "react-toastify";
import routesConstants from "routes/routesConstants";

const LoginPage = ({ setTab, tab }) => {
  const [type, setType] = useState("password");
  const [show, setShow] = useState({
    isShow: false,
    mode: 1,
    isNotAccepted: false,
    isButton: false,
  });
  const [icon, setIcon] = useState("fa-solid fa-eye");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const { maintenanceMsg, isLoading } = useSelector(state => state.login);
  const navigate = useNavigate();
  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
    icon === "fa-solid fa-eye"
      ? setIcon("fa-solid fa-eye-slash")
      : setIcon("fa-solid fa-eye");
  };

  const handleClose = () => {
    setShow({
      isShow: false,
      mode: 1,
      isNotAccepted: false,
    });
  };
  const handleGetModalContent = val => {
    dispatch(getTermConditionOrPrivacyContent(val)).then(res => {
      if (!res?.payload?.data) {
        toast.error("No data found");
        // setTimeout(() => {
        handleClose();
        // }, 500);
      }
    });
  };
  const handleAcceptTermCondition = () => {
    setTab(0);
    if (show?.isNotAccepted) {
      dispatch(setTermCondition());
    }

    dispatch(getTutorAllDetail()).then(res => {
      if ([0, 1, 2].includes(+res?.payload?.data?.onboarding_step)) {
        dispatch(
          changeIsOldUser({
            isOldUser: false,
            step: res?.payload?.data?.onboarding_step,
          }),
        );
        setTimeout(() => {
          navigate("/" + routesConstants.USER, {
            state: {
              step: res?.payload?.data?.onboarding_step,
            },
          });
        }, 2000);
      } else {
        dispatch(
          changeIsOldUser({
            isOldUser: true,
            step: res?.payload?.data?.onboarding_step,
          }),
        );
        // setTimeout(() => {
        navigate("/" + routesConstants.HOME_PAGE);
        // }, 2000);
      }
    });

    handleClose();
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required("Username is required"),
    // .matches(/^[a-zA-Z0-9]*$/, "Only characters and numbers are allowed"),
    password: Yup.string().trim().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema,
    onSubmit: values => {
      // Handle form submission
      const payload = {
        login_id: values.username.trim(),
        password: values.password.trim(),
        keep_login: isLogin,
      };
      dispatch(tutorLogin(payload)).then(res => {
        if (res.payload?.statusCode === 200) {
          if (res.payload?.data?.terms_and_conditions_accepted === 0) {
            setShow({
              isShow: true,
              mode: 1,
              isNotAccepted: true,
              isButton: true,
            });
            handleGetModalContent(1);
          } else {
            handleAcceptTermCondition();
          }
        } else {
          toast.error(res.payload?.message);
        }
      });
    },
  });

  const btnDisable =
    formik.values.password !== "" && formik.values.username !== "";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.info}>
        <div>
          <img src={warningIcon} alt="" />
        </div>
        <div className={styles.infoText}>
          <span className={styles.infoHead}>Scheduled maintenance</span>
          <span>{maintenanceMsg}</span>
        </div>
      </div>
      <div className={classNames("row mx-0", styles["center-aligned-login"])}>
        <div
          className={`col-xl-4 col-md-8 col-lg-6 mx-auto  ${styles.signInContainer}`}
        >
          <div className={styles.loginPanel}>
            <img
              src={companyLogoWithName}
              className={styles.LoginLogo}
              alt=""
            />
            {/* <span className={styles.subHead}>Tutor App</span> */}
          </div>

          <div className={styles.signIn}>
            <form onSubmit={formik.handleSubmit} className="w-100">
              <div className={`mb-4`}>
                <div className={styles.inputIcons}>
                  <img src={openEnvelop} className={styles.icon} alt="" />
                  <input
                    type="text"
                    id="username"
                    className={`"form-control ${styles.inputField}`}
                    placeholder="Username"
                    value={formik.values.username.trimStart()}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger mx-2">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div
                className={classNames(
                  styles.inputIcons,
                  "mb-4  position-relative",
                )}
              >
                <div
                  className={classNames(styles.inputIcons, "position-relative")}
                >
                  <img src={unlock} className={styles.icon} alt="" />
                  <i
                    onClick={showPassword}
                    className={classNames(icon, styles.eyeIcon)}
                    id="togglePassword"
                  ></i>

                  <input
                    type={type}
                    id="password"
                    className={`"form-control ${styles.inputField}`}
                    placeholder="**********"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger mx-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className={classNames(styles.keepLogin, "me-3 mt-4")}>
                <input
                  type="checkbox"
                  onChange={e => {
                    setIsLogin(e.target.checked);
                  }}
                  // value={isLogin}
                />
                <label className="ms-2">Keep me logged in</label>
              </div>
              <button
                disabled={!btnDisable || isLoading}
                type="submit"
                className={classNames(
                  styles.btnPrimary,
                  "px-4 py-3 border-0 mt-3",
                )}
              >
                {isLoading ? "Logging" : "Login"}
              </button>
            </form>
          </div>

          <div className={styles.footer}>
            <span
              onClick={() => {
                setShow({
                  isShow: true,
                  mode: 1,
                });
                handleGetModalContent(1);
              }}
            >
              Terms and Conditions
            </span>
            <span className="mx-3">|</span>
            <span
              onClick={() => {
                setShow({
                  isShow: true,
                  mode: 2,
                });
                handleGetModalContent(2);
              }}
            >
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
      <DocumentModal
        isButton={show?.isButton}
        onConfirm={handleAcceptTermCondition}
        show={show.isShow}
        onHide={handleClose}
        logoImage={show?.mode === 1 ? termCondition : privacyIcon}
        mode={show?.mode}
        title={show?.mode === 1 ? "Terms & conditions" : "Privacy Policy"}
      />
    </div>
  );
};

export default LoginPage;
