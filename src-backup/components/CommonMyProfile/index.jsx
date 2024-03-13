import classNames from "classnames";
import { Alert, EditProfile, bigProfileImage } from "constants/images";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

import styles from "./MyProfile.module.scss";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { s3 } from "constants/aws_helper";
import { useDispatch } from "react-redux";
import {
  getTutorAllDetail,
  setTutorAllDetail,
} from "modules/login/features/loginSlice";
import useOutsideClick from "hooks/useOutsideClick";

const MyProfile = ({ show, onHide }) => {
  const {
    userDetails: { tutor },
  } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [profileImg, setProfileImg] = useState(bigProfileImage);
  const [openName, setOpenName] = useState(false);
  const [name, setName] = useState({
    value: tutor?.tut_pref_name ? tutor?.tut_pref_name : "",
    isDone: false,
  });
  const [summary, setSummary] = useState(false);
  const [longSummary, setLongSummary] = useState({
    value: tutor?.tut_summary ? tutor?.tut_summary : "",
    isDone: false,
  });

  const inputRef = useRef(null);
  const summaryRef = useRef(null);
  const handleCloseNameEdit = useCallback(() => {
    setOpenName(false);
    setName(prev => ({ ...prev, isDone: true }));
  }, []);
  useOutsideClick(inputRef, handleCloseNameEdit);

  const handleCloseSummaryEdit = useCallback(() => {
    setSummary(false);
    setLongSummary(prev => ({ ...prev, isDone: true }));
  }, []);
  useOutsideClick(summaryRef, handleCloseSummaryEdit);

  const handelChangeInput = e => {
    if (inputRef.current) {
      const value = e.target.value;
      setName(prev => ({ ...prev, value: value }));
    }
  };

  const handelChangeInputText = e => {
    const value = e.target.value;
    setLongSummary(prev => ({ ...prev, value: value }));
  };

  const updateProfile = useCallback(
    value => {
      dispatch(setTutorAllDetail(value));
      setLongSummary(prev => ({ ...prev, isDone: false }));
      setName(prev => ({ ...prev, isDone: false }));
    },
    [dispatch],
  );
  useEffect(() => {
    if (name?.isDone) {
      if (name?.value?.trim()?.length !== 0) {
        updateProfile({ tut_pref_name: name.value });
      } else {
        toast.warning("This field can not be empty.");
        setName({
          value: tutor?.tut_pref_name ? tutor?.tut_pref_name : "",
          isDone: false,
        });
      }
    }
  }, [name, updateProfile]);

  useEffect(() => {
    if (longSummary?.isDone) {
      if (longSummary?.value?.trim()?.length === 0) {
        toast.warning("This field can not be empty.");
        setLongSummary({
          value: tutor?.tut_summary ? tutor?.tut_summary : "",
          isDone: false,
        });
      } else {
        updateProfile({ tut_summary: longSummary.value });
      }
    }
  }, [longSummary, updateProfile]);

  useEffect(() => {
    if (tutor) {
      tutor?.tut_profile_pic && setProfileImg(tutor?.tut_profile_pic);
      setLongSummary(prev => ({ ...prev, value: tutor?.tut_summary }));
      setName(prev => ({ ...prev, value: tutor?.tut_pref_name }));
    }
  }, [tutor]);

  const onDrop = useCallback(
    async acceptedFiles => {
      const file = acceptedFiles[0];
      if (file.type.includes("image")) {
        setIsLoad(true);
        const fileName = `${Date.now()}_${file.name}`;
        const params = {
          Key: fileName,
          Body: file,
          ACL: "public-read",
          ContentType: file.type,
        };
        s3()
          .upload(params)
          .send(function (err, data) {
            if (err) {
              toast.error(err);
            } else {
              setIsLoad(false);
              setProfileImg(data?.Location);
              updateProfile({ tut_profile_pic: data?.Location });
            }
          });
      } else {
        toast.error("Please Upload Image File Only...");
      }
    },
    [updateProfile],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    dispatch(getTutorAllDetail());
  }, [dispatch]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className={classNames(styles.profileModal)}
      size="lg"
    >
      <div className="p-4">
        <Modal.Header closeButton className={classNames(styles.header)}>
          <div>
            <h6 className={classNames(styles.headerTitle)}> My Profile </h6>
            <p className={classNames(styles.headerTimeline)}>
              Last modified {moment(tutor?.updated_on).format("MMMM YYYY")}
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className={classNames(styles.body)}>
          <div className={classNames(styles.bodyContainer)}>
            <div className={classNames(styles.profileSection)}>
              <div className={classNames(styles.imageWrapper)}>
                {!isLoad ? (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      src={profileImg}
                      alt="Profile_Image"
                      className={classNames(styles.image)}
                    />
                    <img
                      src={EditProfile}
                      alt="Profile_Edit"
                      className={classNames(styles.editImg)}
                    />
                  </div>
                ) : (
                  <div className={classNames(styles.image, "border")}>
                    Uploading Image...
                  </div>
                )}
                <div className={classNames(styles.titleSection)}>
                  Tutor ID: {tutor?.pk_tut_id}
                </div>
              </div>
              <div className={classNames(styles.profileDetailsWrapper)}>
                <div className={classNames(styles.name)}>
                  <div className={classNames(styles.titleWrapper)}>
                    <div className={classNames(styles.lable)}>
                      Preferred name
                    </div>
                    <img
                      src={EditProfile}
                      alt="Profile_Edit"
                      className={classNames(styles.img)}
                      onClick={() => {
                        setOpenName(!openName);
                      }}
                    />
                  </div>
                  {openName ? (
                    <>
                      <input
                        className={classNames(styles.nameInput)}
                        onChange={e => {
                          handelChangeInput(e);
                        }}
                        placeholder="Enter Your Name"
                        ref={inputRef}
                        value={name?.value}
                        maxLength={45}
                      />
                      <span className={styles.errorText}>
                        {name?.value?.trim()?.length === 45
                          ? "Text limit exceeded"
                          : ""}
                      </span>
                    </>
                  ) : (
                    <div className={classNames(styles.value)}>
                      {tutor?.tut_pref_name ? tutor?.tut_pref_name : "-"}
                    </div>
                  )}
                </div>
                <div className={classNames(styles.name)}>
                  <div className={classNames(styles.titleWrapper)}>
                    <div className={classNames(styles.lable)}>Summary</div>
                    <img
                      src={EditProfile}
                      alt="Profile_Edit"
                      className={classNames(styles.img)}
                      onClick={() => {
                        setSummary(!summary);
                      }}
                    />
                  </div>
                  {summary ? (
                    <>
                      <textarea
                        className={classNames(styles.nameInputSummary)}
                        onChange={e => {
                          handelChangeInputText(e);
                        }}
                        placeholder="Summary"
                        rows="4"
                        cols="20"
                        value={longSummary?.value}
                        ref={summaryRef}
                        maxLength={500}
                      ></textarea>
                      <span className={styles.errorText}>
                        {longSummary?.value?.trim()?.length === 500
                          ? "Text limit exceeded"
                          : ""}
                      </span>
                    </>
                  ) : (
                    <div className={classNames(styles.value)}>
                      {/* {longSummary} */}
                      {tutor?.tut_summary ? tutor?.tut_summary : "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classNames(styles.deviederSection)}></div>
            <div className={classNames(styles.detailsSection)}>
              <div className={classNames(styles.detailsWrapper)}>
                <div className={classNames(styles.detailsCard)}>
                  <div className={classNames(styles.cardTitle)}>Account</div>
                  <div className={classNames(styles.cardBody)}>
                    <div
                      className={classNames(
                        styles.cardContaint,
                        styles.usernameInner,
                      )}
                    >
                      <div className={classNames(styles.cardContaintDetails)}>
                        <div className={classNames(styles.title)}>Username</div>
                      </div>

                      <div className={classNames(styles.name)}>
                        {tutor?.Username ? tutor?.Username : "-"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classNames(styles.otherInformation)}>
                  {/* Personal Information */}
                  <div className={classNames(styles.detailsCard)}>
                    <div className={classNames(styles.cardTitle)}>
                      Personal Information
                    </div>
                    <div className={classNames(styles.cardBody)}>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Salutation
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_salutation
                              ? tutor?.tut_salutation
                              : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            First Name
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_fname ? tutor?.tut_fname : "-"}
                          </div>
                        </div>
                      </div>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Last Name
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_surname ? tutor?.tut_surname : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Birth date
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_dob
                              ? moment(tutor?.tut_dob).format("D MMM YYYY")
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className={classNames(styles.detailsCard)}>
                    <div className={classNames(styles.cardTitle)}>
                      Address Information
                    </div>
                    <div className={classNames(styles.cardBody)}>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Address
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_address ? tutor?.tut_address : "-"}
                          </div>
                        </div>
                      </div>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Country
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.country_name ? tutor?.country_name : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>State</div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_state ? tutor?.tut_state : "-"}
                          </div>
                        </div>
                      </div>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>City</div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_city ? tutor?.tut_city : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Postcode
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_zip ? tutor?.tut_zip : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className={classNames(styles.detailsCard)}>
                    <div className={classNames(styles.cardTitle)}>
                      Contact Information
                    </div>
                    <div className={classNames(styles.cardBody)}>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Home Phone
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_home_phone
                              ? tutor?.tut_home_phone
                              : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            Work Phone
                          </div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_work_phone
                              ? tutor?.tut_work_phone
                              : "-"}
                          </div>
                        </div>
                      </div>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>Mobile</div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_mobile ? tutor?.tut_mobile : "-"}
                          </div>
                        </div>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>Email</div>
                          <div className={classNames(styles.name)}>
                            {tutor?.tut_emailid ? tutor?.tut_emailid : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classNames(styles.detailsCard)}>
                    <div className={classNames(styles.cardTitle)}>
                      About Tutor
                    </div>
                    <div className={classNames(styles.cardBody)}>
                      <div className={classNames(styles.cardContaint)}>
                        <div className={classNames(styles.cardContaintDetails)}>
                          <div className={classNames(styles.title)}>
                            {tutor?.tut_notes ? tutor?.tut_notes : "-"}
                          </div>
                          <div className={classNames(styles.name)}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames(styles.notificationWrapper)}>
                <img
                  src={Alert}
                  alt="alert"
                  className={classNames(styles.icon)}
                />
                <div className={classNames(styles.text)}>
                  Please notify your admin immediately if the information is not
                  accurate.
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default MyProfile;
