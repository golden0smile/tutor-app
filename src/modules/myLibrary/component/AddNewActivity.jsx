import styles from "./AddNewActivity.module.scss";
import React, { useEffect, useState } from "react";
import CustomSelect from "components/CommonDropDown";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { IoMdAddCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import { worksheet_aws } from "constants/aws_helper";
import { myLibraryDuration } from "../constant/myLibraryConstant";
import { activityTypes } from "../constant/activityTypes";

const AddNewActivity = ({
  values,
  setValues,
  subject_id = "",
  isDisabledSubject = false,
  isEdit = false,
  errorValues,
  setErrorValues,
  isValidUrl,
}) => {
  const [isLoad, setLoad] = useState(false);

  const handleFile = file => {
    if (file.type.includes("pdf")) {
      const fileName = `${Date.now()}_${file.name}`;
      const params = {
        Key: fileName,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
      };
      worksheet_aws()
        .upload(params)
        .send(function (err, data) {
          if (err) {
            toast.error(err);
          } else {
            setValues(prev => ({
              ...prev,
              file: data?.Location,
            }));
            setLoad(false);
          }
        });
    } else {
      toast.error("Please Upload PDF File Only...");
      setLoad(false);
    }
  };

  const subject = [
    {
      label: "English",
      value: 1,
    },
    {
      label: "Maths",
      value: 2,
    },
    {
      label: "Others",
      value: 3,
    },
  ];

  const handleChange = event => {
    setLoad(true);

    const fileUploaded = event[0];
    let fileSize = fileUploaded.size;
    if (fileSize > 2 * 1024 * 1024) {
      toast.error("File size is more than 2 mb");
      setLoad(false);
    } else {
      handleFile(fileUploaded);
      setErrorValues(prev => ({
        ...prev,
        file: false,
      }));
    }
  };

  const FileUploadContent = () => {
    return (
      <div className={styles.formColumn} style={{ width: "100%" }}>
        <label>Upload PDF</label>
        <span>File size should not exceed 2mb</span>
        {errorValues?.file && errorMsg("File is required")}
        <br></br>
        {values?.file ? (
          <div className={styles.formRow}>
            <label style={{ overflowWrap: "anywhere", width: "80%" }}>
              {values?.file}
            </label>
            <AiFillDelete
              style={{ cursor: "pointer", height: "20px", width: "20px" }}
              onClick={() =>
                setValues(prev => ({
                  ...prev,
                  file: "",
                }))
              }
              color="#d83d59"
            />
          </div>
        ) : (
          <>
            <Dropzone onDrop={handleChange}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <div className={styles.fileUploadContainer}>
                    {isLoad ? (
                      <div className={styles.formRow}>
                        <label>Uploading the document...</label>
                      </div>
                    ) : (
                      <div className={styles.formRow}>
                        <IconContext.Provider
                          value={{ className: styles.fileUploadText }}
                        >
                          <IoMdAddCircle />
                        </IconContext.Provider>
                        <label className={styles.fileUploadText}>
                          <u>Add</u>
                        </label>
                      </div>
                    )}
                  </div>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
          </>
        )}
      </div>
    );
  };

  const handleSubjectTopics = id => {
    if (id) {
      setValues(prev => ({
        ...prev,
        subject: id,
      }));
    }
  };

  useEffect(() => {
    if (subject_id || (isEdit && values?.subject)) {
      handleSubjectTopics(values?.subject ? values?.subject : subject_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject_id, isEdit, values?.subject]);
  const errorMsg = msg => {
    return (
      <div style={{ height: "10px" }} className="text-danger mx-2 ">
        {msg}
      </div>
    );
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <label className={styles.inputLabel}> Subject</label>
          <CustomSelect
            placeHolder="Subject"
            list={subject}
            value={values?.subject ? values?.subject : subject_id}
            handleChange={(e, t) => {
              handleSubjectTopics(e.value);
              setErrorValues(prev => ({
                ...prev,
                subject: false,
              }));
              if (+e.value === 3) {
                setErrorValues(prev => ({
                  ...prev,
                  topic: false,
                }));
              }
            }}
            isDisabled={isDisabledSubject || isEdit}
          />
          {errorMsg(errorValues?.subject ? "Subject is required" : "")}
        </div>

        <div className={styles.formColumn}>
          <label className={styles.inputLabel}>Activity type</label>
          <CustomSelect
            placeHolder="Select type"
            list={activityTypes}
            value={values?.activity_type?.value}
            handleChange={(e, t) => {
              setValues(prev => ({
                ...prev,
                activity_type: e,
              }));
              setErrorValues(prev => ({
                ...prev,
                activity_type: false,
                link: false,
                video: false,
                file: false,
              }));
            }}
          />
          {errorMsg(
            errorValues?.activity_type ? "Activity type is required" : "",
          )}
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <label className={styles.inputLabel}>Activity name</label>
          <input
            value={values?.activity_name}
            onChange={e => {
              setValues(prev => ({ ...prev, activity_name: e.target.value }));

              setErrorValues(prev => ({
                ...prev,
                activity_name: false,
              }));
            }}
            placeholder="Name"
          />
          {errorMsg(
            errorValues?.activity_name ? "Activity name is required" : "",
          )}
        </div>
        <div className={styles.formColumn}>
          <label className={styles.inputLabel}>Source</label>
          <input
            value={values?.source}
            placeholder="Source"
            onChange={e => {
              setValues(prev => ({ ...prev, source: e.target.value }));
            }}
          />
          {errorMsg("")}
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <label className={styles.inputLabel}>Duration</label>

          <CustomSelect
            value={values?.duration?.value}
            placeHolder="Select Duration"
            list={myLibraryDuration}
            handleChange={(e, t) => {
              setValues(prev => ({
                ...prev,
                duration: e,
              }));
              setErrorValues(prev => ({
                ...prev,
                duration: false,
              }));
            }}
          />
          {errorMsg(errorValues?.duration ? "Duration is required" : "")}
        </div>

        {(values?.activity_type?.value === 1 ||
          values?.activity_type?.value === 3) && (
          <div className={styles.formColumn}>
            <label className={styles.inputLabel}>
              {values?.activity_type?.label}
            </label>
            <input
              placeholder={
                values?.activity_type?.value === 1
                  ? "URL"
                  : values?.activity_type?.label
              }
              value={
                values?.activity_type?.value === 3
                  ? values?.link
                  : values?.activity_type?.value === 1 && values?.video
              }
              onChange={e =>
                values?.activity_type?.value === 3
                  ? (setValues(prev => ({ ...prev, link: e.target.value })),
                    setErrorValues(prev => ({
                      ...prev,
                      link: false,
                      linkValid: isValidUrl(e.target.value) ? false : true,
                    })))
                  : values?.activity_type?.value === 1 &&
                    (setValues(prev => ({ ...prev, video: e.target.value })),
                    setErrorValues(prev => ({
                      ...prev,
                      video: false,
                      linkValid: isValidUrl(e.target.value) ? false : true,
                    })))
              }
            />
            {errorValues?.link
              ? errorMsg("Link is required")
              : errorValues?.video
              ? errorMsg("Video URL is required")
              : errorValues?.linkValid
              ? errorMsg("Enter valid url")
              : errorMsg("")}
          </div>
        )}
      </div>
      <div className={styles.formRow}>
        {values?.activity_type?.value === 5 && <FileUploadContent />}
      </div>
    </form>
  );
};
export default AddNewActivity;
