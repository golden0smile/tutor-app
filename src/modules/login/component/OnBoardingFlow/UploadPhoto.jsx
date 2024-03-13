import React, { useState } from "react";
import styles from "./UploadPhoto.module.scss";
import classNames from "classnames";
import DropZone from "components/Dropzon";
import UserCommonBtn from "./common/UserCommonBtn";
import { useDispatch } from "react-redux";
import { setTutorAllDetail } from "modules/login/features/loginSlice";

const UploadPhoto = ({ setStep }) => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const handleConfirmNext = () => {
    if (profileImg) {
      dispatch(
        setTutorAllDetail({
          tut_profile_pic: profileImg,
        }),
      );
    }
  };

  const handleUpload = value => {
    if (value) {
      setProfileImg(value);
    }
  };
  return (
    <div className={classNames(styles.main_container, "container w-100")}>
      <div className={classNames(styles.detail_container, "")}>
        <div className={classNames(styles.optionContent, "")}>
          <span className={classNames(styles.heading, styles.photo_title)}>
            Upload a photo of yourself (Optional)
          </span>
          <span className={classNames(styles.fs_12, "mt-3 mb-3")}>
            Your photo will be displayed on the student and parent platforms.
          </span>
          <DropZone
            onUpload={value => {
              handleUpload(value);
            }}
            isLoad={isLoad}
            setIsLoad={setIsLoad}
          />
        </div>

        <div className={classNames("mb-3", styles.btnDiv)}>
          <UserCommonBtn
            disable={isLoad}
            setStep={setStep}
            step={"done"}
            backStep={1}
            btn1_text="Back"
            btn2_text="Next"
            handleConfirmNext={handleConfirmNext}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
