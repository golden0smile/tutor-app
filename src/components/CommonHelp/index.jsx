import classNames from "classnames";
import { Help } from "constants/images";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import style from "./Helpmodal.module.scss";
const HelpModal = ({ show, onHide }) => {
  const notify = () =>
    toast.info(
      <div className="d-flex flex-column justify-content-start">
        <p className={classNames(style.title)}> Message from Administrator </p>
        <p>
          {" "}
          Business Name will be closed on 4 June 2023 for a staff retreat.{" "}
        </p>
      </div>,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { width: "1000px", right: "700px", height: "80px" },
      },
    );

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter Your First Name"),
    message: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter Your Message"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Your Email"),
  });

  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title className={classNames(style.helpTitle)}>
          <img
            src={Help}
            alt="imageHelp"
            className={classNames(style.helpImage, "me-3")}
          />
          Help and Support
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className={classNames("d-flex flex-column justify-content-center")}
        >
          <div>
            <Formik
              initialValues={{
                firstName: "",
                email: "",
                message: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                // same shape as initial values
                notify();
                onHide();
              }}
            >
              {({ errors, touched }) => (
                <Form className={classNames("d-flex flex-column gap-2")}>
                  <div className={classNames(style.inputGroup)}>
                    <label className={classNames(style.label)}>Full name</label>
                    <Field
                      name="firstName"
                      placeholder="Enter the full name"
                      className={classNames(style.input)}
                    />
                  </div>
                  {errors.firstName && touched.firstName ? (
                    <div className={classNames(style.error)}>
                      {errors.firstName}
                    </div>
                  ) : null}
                  <div className={classNames(style.inputGroup)}>
                    <label className={classNames(style.label)}> Email </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter the Email"
                      className={classNames(style.input)}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className={classNames(style.error)}>
                      {errors.email}
                    </div>
                  ) : null}
                  <div className={classNames(style.inputGroup)}>
                    <label className={classNames(style.label)}> Message </label>
                    <Field
                      name="message"
                      as="textarea"
                      placeholder="Message"
                      className={classNames(style.textarea, style.input)}
                    />
                  </div>
                  {errors.message && touched.message ? (
                    <div className={classNames(style.error)}>
                      {errors.message}
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className={classNames(style.button, "mt-3")}
                  >
                    Send
                  </button>
                  <ToastContainer style={{}} />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HelpModal;
