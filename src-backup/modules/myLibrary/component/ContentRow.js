import React from "react";
import { RiEdit2Line, RiDeleteBin5Line } from "react-icons/ri";
import { getActivityType } from "modules/session/utils/getActivityType";
import moment from "moment";
import { getDuration } from "modules/session/utils/getDuration";

const ContentRow = ({ showModal, extra, parentStyle, setDeleteModal }) => {
  const handleDeleteIcon = data => {
    setDeleteModal({
      show: true,
      id: extra?.pk_tutor_library_item_id,
      subject_id: extra?.fk_sub_id,
    });
  };

  const handleEditIcon = data => {
    showModal({
      show: true,
      data: data,
    });
  };

  return (
    <div className={parentStyle.innerRowWrapper}>
      <div className={parentStyle.innerRow}>
        <div className={parentStyle.rowTitle}>
          <div className={parentStyle.title}>
            {extra?.name ? extra?.name : "-"}
          </div>
        </div>
      </div>

      <div className={parentStyle.innerRow}>
        <div className={parentStyle.rowTitle}>
          <div className={parentStyle.title}>
            {extra?.source ? extra?.source : "-"}
          </div>
        </div>
      </div>

      <div className={parentStyle.innerRow}>
        <div className={parentStyle.rowTitle}>
          <div className={parentStyle.title}>
            {extra?.duration ? getDuration(extra?.duration) : "-"}
          </div>
        </div>
      </div>

      <div className={parentStyle.innerRow}>
        <div className={parentStyle.rowTitle}>
          <div className={parentStyle.title}>
            {extra?.activity_type ? getActivityType(extra?.activity_type) : "-"}
          </div>
        </div>
      </div>
      <div className={parentStyle.innerRow}>
        <div className={parentStyle.rowTitle}>
          <div className={parentStyle.title}>
            {extra?.created_on
              ? moment(extra?.created_on).format("D MMM YYYY")
              : "-"}
          </div>
        </div>
      </div>

      <div className={parentStyle.innerRow}>
        <RiEdit2Line
          onClick={() => {
            handleEditIcon(extra);
          }}
          className="cursor-pointer"
        />
        <RiDeleteBin5Line
          onClick={() => {
            handleDeleteIcon(extra);
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ContentRow;
