import React, { useEffect, useState } from "react";
import styles from "./InnerCollapse.module.scss";
import { Collapse } from "reactstrap";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ContentRow from "./ContentRow";

const InnerCollapse = ({
  args,
  title = "",
  showModal,
  parentStyle,
  childData,
  setDeleteModal,
  isDefaultShow,
}) => {
  const [isOpenInner, setIsOpenInner] = useState(false);

  const toggleInner = () => setIsOpenInner(!isOpenInner);
  useEffect(() => {
    if (isDefaultShow) {
      setIsOpenInner(true);
    }
  }, [isDefaultShow]);

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.collapse} onClick={() => toggleInner()}>
          <span className="">{title ? title : "-"}</span>

          {childData?.length > 0 ? (
            isOpenInner ? (
              <BsChevronUp />
            ) : (
              <BsChevronDown />
            )
          ) : null}
        </div>
        {childData?.length > 0 ? (
          <Collapse isOpen={isOpenInner} {...args}>
            {childData?.map((x, index) => (
              <ContentRow
                showModal={showModal}
                parentStyle={parentStyle}
                extra={x}
                key={index}
                setDeleteModal={setDeleteModal}
              />
            ))}
          </Collapse>
        ) : null}
      </div>
    </>
  );
};

export default InnerCollapse;
