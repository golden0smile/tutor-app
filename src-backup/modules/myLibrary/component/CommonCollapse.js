import React, { useEffect, useState } from "react";
import styles from "./CommonCollapse.module.scss";
import { Collapse } from "reactstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ContentRow from "./ContentRow";

const CommonCollapse = ({
  args,
  title = "",
  showModal,
  parentStyle,
  innerData,
  setDeleteModal,
  isDefaultShow = false,
  isOther = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isDefaultShow) {
      setIsOpen(true);
    }
  }, [isDefaultShow]);

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.collapse} onClick={() => toggle()}>
          <span className="">{title}</span>

          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </div>
      </div>
      <Collapse isOpen={isOpen} {...args}>
        {!isOther && innerData?.length > 0 ? (
          <>
            {" "}
            {innerData?.map((x, index) => (
              <ContentRow
                showModal={showModal}
                parentStyle={parentStyle}
                extra={x}
                key={index}
                setDeleteModal={setDeleteModal}
              />
            ))}
          </>
        ) : isOther && innerData.length > 0 ? (
          innerData?.map(x => (
            <ContentRow
              showModal={showModal}
              parentStyle={parentStyle}
              setDeleteModal={setDeleteModal}
              extra={x}
            />
          ))
        ) : null}
      </Collapse>
    </>
  );
};

export default CommonCollapse;
