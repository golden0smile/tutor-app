import { config } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export const s3 = (
  bucket = process.env.REACT_APP_AWS_BUCKET_NAME,
  folder = process.env.REACT_APP_AWS_PROFILE_FOLDER_NAME,
) =>
  new S3({
    params: {
      Bucket: `${bucket}/tutor/${folder}`,
    },
    region: process.env.REACT_APP_AWS_REGION,
  });

export const worksheet_aws = (
  bucket = process.env.REACT_APP_AWS_BUCKET_NAME,
  folder = process.env.REACT_APP_AWS_WORKSHEET_FOLDER_NAME,
) =>
  new S3({
    params: {
      Bucket: `${bucket}/tutor/${folder}`,
    },
    region: process.env.REACT_APP_AWS_REGION,
  });
