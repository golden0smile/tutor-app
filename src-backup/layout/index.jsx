import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import { useState, useEffect } from "react";
import useWindowSize from "hooks/useWindowSize";
import Header from "./Header";

const Layout = () => {
  const { isAuth, isOldUser } = useSelector(state => state.login);
  const [collapsed, setCollapsed] = useState(false);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize?.width < 1024) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [windowSize]);

  return isAuth && isOldUser ? (
    <div className="d-flex">
      <LeftBar
        className="vh-100"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className="d-flex flex-column"
        style={{
          width: `calc(100% - ${collapsed ? "80px" : "200px"} )`,
          marginLeft: collapsed ? "80px" : "200px",
          transition: "all 1s ease",
        }}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
export default Layout;
