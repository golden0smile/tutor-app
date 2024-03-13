import classNames from "classnames";
import { gallery } from "constants/images";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
import { s3 } from "../../constants/aws_helper";

const FileUpload = ({ onUpload, isLoad, setIsLoad }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClear = () => {
    setSelectedImage(null);
  };
  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    if (file.type.includes("image")) {
      setIsLoad(true);
      // Store the selected image in state
      setSelectedImage(URL.createObjectURL(file));

      const fileName = `${Date.now()}_${file.name}`;

      // Create a signed URL for file upload to S3
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
            console.log({ err });
          } else {
            setIsLoad(false);
            onUpload(data?.Location);
          }
        });
    } else {
      toast.error("Please Upload Image Only...");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={classNames(
        selectedImage && !isLoad ? styles.selectedImageDiv : "",
        styles.dropzonMain,
        "container",
      )}
    >
      {selectedImage && !isLoad ? (
        <>
          <img src={selectedImage} alt="" className={styles.displayImg} />
          <i className="fa-solid fa-circle-xmark" onClick={handleClear}></i>
        </>
      ) : null}
      {isLoad ? (
        <div className={classNames(styles.loading)}>
          <span className="d-flex justify-content-center">
            {" "}
            Uploading Image...
          </span>
        </div>
      ) : !selectedImage ? (
        <div {...getRootProps()} className={classNames(styles.dropzon)}>
          <input {...getInputProps()} />
          <img src={gallery} alt="" />
          <span>Drag and drop or browse to choose a file</span>
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
