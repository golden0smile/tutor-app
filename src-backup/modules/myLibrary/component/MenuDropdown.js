import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import currentStyles from "./MenuDropdown.module.scss";
import { menuIcon } from "constants/images";

const MenuDropdown = ({ setOverLay }) => {
  const [menu, setMenu] = useState(false);

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => {
        setMenu(prev => !prev);
        setOverLay(prev => !prev);
      }}
      className={currentStyles.top_4}
    >
      <DropdownToggle tag="div" className={currentStyles.drop_padding}>
        <img src={menuIcon} alt="" />
      </DropdownToggle>
      <DropdownMenu className={currentStyles.drop_down_menu}>
        <DropdownItem className={currentStyles.drop_down_menuItem}>
          <Link to="">
            <p className="dropdown_text mb-0 drop_link">
              <RiEdit2Fill />
              <span>Edit</span>
            </p>
          </Link>
        </DropdownItem>
        <DropdownItem className={currentStyles.drop_down_menuItem}>
          <Link to="">
            <p className="dropdown_text mb-0 drop_link">
              <BsFillFileEarmarkBarGraphFill />
              <span>View</span>
            </p>
          </Link>
        </DropdownItem>
        <DropdownItem className={currentStyles.drop_down_menuItem}>
          <Link to="">
            <p className="dropdown_text mb-0 drop_link">
              <FaTrash />
              <span>Delete</span>
            </p>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
