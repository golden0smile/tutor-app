import classNames from "classnames";
import HelpModal from "components/CommonHelp";
import MyProfile from "components/CommonMyProfile";
import {
  LeftCollapseIcon,
  LogOutIcon,
  companyLogoInHome as companyLogoWithName,
  bigProfileImage,
  LeftCollapseIconWhite,
} from "constants/images";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./LeftBar.module.scss";
import { menuItems } from "./constant";
import LogoutModal from "./LogoutModal";
import { useSelector } from "react-redux";
import routesConstants from "routes/routesConstants";

const LeftBar = ({ collapsed, setCollapsed }) => {
  const {
    userDetails: { tutor },
  } = useSelector(state => state.login);
  const [show, setShow] = useState(false);
  const [profile, closeProfile] = useState(false);
  const [help, setHelpClose] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div
        className={classNames(style.sidebar)}
        style={{ width: collapsed ? "80px" : "200px" }}
      >
        <div className={classNames(style.sidebarInner)}>
          <div className={classNames(style.innerBlock)}>
            <div className={classNames(style.upperBlock)}>
              <div
                className={classNames(
                  style.brandLogoWrapper,
                  collapsed ? style.collapseLogoWrapper : null,
                )}
              >
                <div
                  className={classNames(
                    style.logo,
                    collapsed ? style.collapseLogo : null,
                  )}
                  onClick={e =>
                    location.pathname === `/${routesConstants?.HOME_PAGE}`
                      ? (e.preventDefault(), window.location.reload())
                      : navigate("/" + routesConstants?.HOME_PAGE)
                  }
                >
                  <img
                    src={companyLogoWithName}
                    alt="company-logo"
                    className={classNames(
                      collapsed ? style.collapseBrandLogo : null,
                      style.brandLogo,
                    )}
                  />
                  {/* <span>Tutor App</span> */}
                </div>

                <img
                  src={LeftCollapseIconWhite}
                  alt="company-logo"
                  className={classNames(style.collapseIcon)}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    transform: `rotate(${collapsed ? "180deg" : "0deg"})`,
                  }}
                />
              </div>
              <div className={classNames(style.navListWrapper)}>
                {menuItems?.map((items, index) => {
                  return (
                    <Link
                      onClick={event =>
                        location.pathname === `/${items?.mainRoute}` &&
                        (event.preventDefault(), window.location.reload())
                      }
                      to={items?.mainRoute}
                      className={
                        items.routes?.find((item, i) =>
                          location.pathname.includes(item),
                        )
                          ? classNames(style.navListSelected)
                          : classNames(style.navList)
                      }
                      key={index}
                    >
                      <img
                        src={
                          location.pathname === `/${items.routes}`
                            ? items.menuIconBlack
                            : items.menuIcon
                        }
                        alt={items.menuName}
                      />
                      {collapsed ? null : <span>{items.menuName} </span>}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={classNames(
                style.lowerBlock,
                collapsed ? "border-0" : null,
              )}
            >
              <div className={classNames(style.lowerBlockWrapper)}>
                <div
                  className={classNames(style.profileMenu)}
                  onClick={() => closeProfile(true)}
                >
                  <img
                    src={
                      tutor?.tut_profile_pic
                        ? tutor?.tut_profile_pic
                        : bigProfileImage
                    }
                    alt="profile"
                    className={classNames(style.profilImg)}
                  />
                  {collapsed ? null : (
                    <div className={classNames(style.profileDetails)}>
                      <div className={classNames(style.profileName)}>
                        {!!tutor?.tut_fname
                          ? tutor?.tut_fname + " " + tutor?.tut_surname
                          : "-"}
                      </div>
                      <div className={classNames(style.profileDescription)}>
                        Edit profile
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={classNames(style.logoutSection)}
                  onClick={() => setShow(true)}
                >
                  <img src={LogOutIcon} alt="logout" height={24} width={24} />
                  {collapsed ? null : (
                    <div className={classNames(style.logoutTitle)}>Log out</div>
                  )}
                </div>
                {/* <div
                  className={classNames(style.logoutSection)}
                  onClick={() => setHelpClose(true)}
                >
                  <img src={helpIcon} alt="helpIcon" height={24} width={24} />
                  {collapsed ? null : (
                    <div className={classNames(style.logoutTitle)}>Help</div>
                  )}
                </div> */}
              </div>
              {/* {collapsed ? null : (
                <div className={classNames(style.powerBySection)}>
                  <div className={classNames(style.powerByTitle)}>
                    Powered by
                  </div>
                  <img
                    className={style.powerBy}
                    src={companyLogo}
                    alt="company-logo"
                    width="42"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <LogoutModal show={show} onHide={() => setShow(false)} title="Log out" />
      <MyProfile
        show={profile}
        onHide={() => {
          closeProfile(false);
          // window.location.reload();
        }}
        title="my Profile"
      />
      <HelpModal show={help} onHide={() => setHelpClose(false)} />
    </>
  );
};

export default LeftBar;
