import React, { useState } from "react";
import styles from "./HeaderDropDown.module.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { myLibraryHeaderDropDown } from "constants/CustomTableConstant";

const HeaderDropDown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    myLibraryHeaderDropDown[0]?.label,
  );
  return (
    <Dropdown
      className={`nav-link dropdown-toggle align-items-center d-flex ${styles.downArrow}`}
      isOpen={isMenuOpen}
      toggle={e => {
        setIsMenuOpen(prev => !prev);
      }}
    >
      <>
        <DropdownToggle
          tag="div"
          toggle={() => {
            setIsMenuOpen(prev => !prev);
          }}
          className={`${styles.dropArrow} d-flex`}
        >
          <div className={`${styles.dropMenu} me-3 text-center`}></div>
          {selectedValue}
        </DropdownToggle>
        <DropdownMenu className={styles.dropMenu}>
          {myLibraryHeaderDropDown
            ?.filter(x => x.label !== selectedValue)
            .map((item, index) => (
              <DropdownItem
                className={styles.dropDownItem}
                key={item?.value}
                value={item.label}
                onClick={e => setSelectedValue(e.target.value)}
              >
                {item?.label}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </>
    </Dropdown>
  );
};

export default HeaderDropDown;
