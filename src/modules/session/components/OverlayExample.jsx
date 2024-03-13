import { dots } from "constants/images";
import DeleteModal from "modules/myLibrary/component/DeleteModal";
import { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PreviewModal from "../Activity/components/PreviewModal";

function OverlayExample({
  data,
  lesson_key,
  activity_key,
  handleActivityDelete,
  redirectHandler,
  handlePreview,
  handleRepeat,
  activity_type,
  handleMarkView,
}) {
  const [show, setShow] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const target = useRef(null);
  useOutsideAlerter(target);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, show]);
  }
  const handleOverlay = i => {
    if (i?.id === 6) {
      setShowDeleteModal(true);
    } else if (i?.id === 4) {
      if (+activity_type === 0) {
        redirectHandler();
      }
    } else if (i?.id === 1) {
      // if (+activity_type !== 2) {
      handlePreview();
      // setShowPrev(true);
      // }
    } else if (i?.id === 3) {
      if (+activity_type !== 2) {
        handleRepeat();
      }
    } else if (i?.id === 7) {
      handleMarkView();
    }
    setShow(!show);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const handleClosePrev = () => {
    setShowPrev(false);
  };
  const handlePrevConfirmation = () => {
    setShowPrev(false);
    handlePreview();
  };
  return (
    <div className="customDropDown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <img
            src={dots}
            variant="danger"
            ref={target}
            onClick={() => setShow(!show)}
            alt=""
          />
        </DropdownToggle>

        <DropdownMenu style={{ inset: "0px 0px 20px 20px" }}>
          {data?.map((item, i) => {
            return (
              <DropdownItem key={i} onClick={() => handleOverlay(item)}>
                <img src={item?.icon} alt="" />
                <label>{item?.name}</label>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteConfirmation={() => {
          handleActivityDelete(lesson_key, activity_key);
          setShowDeleteModal(false);
        }}
        msg="Are you want to delete?"
      />
      <PreviewModal
        show={showPrev}
        onHide={handleClosePrev}
        confirmation={handlePrevConfirmation}
      />
    </div>
  );
}

export default OverlayExample;
