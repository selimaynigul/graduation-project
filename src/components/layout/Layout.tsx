import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Menu } from "antd";
import Sidebar from "./Sider";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import {
  StyledContent,
  Heading,
  Title,
  ProfileContainer,
  ProfileInfo,
  ProfilePhoto,
} from "./layoutStyles";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "contexts/AuthProvider";
import SearchBar from "./Searchbar"; // Import the new SearchBar component

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchActive, setSearchActive] = useState(false);

  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      setCollapsed(mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout(location);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item
        onClick={handleLogout}
        key="logout"
        icon={<LogoutOutlined style={{ color: "red" }} />}
        style={{ color: "red" }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  const pathTitles: { [key: string]: string } = {
    "/": "Dashboard",
    "/companies": "Companies",
    "/classes": "Classes",
    "/trainers": "Trainers",
    "/users": "Users",
    "/packages": "Packages",
    "/reports": "Reports",
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const basePath = `/${pathSegments[0] || ""}`;
  const pageTitle = pathTitles[basePath] || "Dashboard";
  return (
    <Layout style={{ height: "100vh" }}>
      {!collapsed && isMobile && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
          }}
        />
      )}
      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        closeSider={() => setCollapsed(true)}
        setCollapsed={setCollapsed}
      />
      <Layout className="site-layout">
        {isMobile && (
          <Header
            pageTitle={pageTitle}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />
        )}
        <Heading isMobile={isMobile}>
          <Title>{pageTitle}</Title>
          <SearchBar
            isMobile={isMobile}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />

          {!isMobile && (
            <ProfileContainer>
              <ProfileInfo>
                <h4>John Doe</h4>
                <span>Software Engineer</span>
              </ProfileInfo>
              <Dropdown
                overlay={profileMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <ProfilePhoto />
              </Dropdown>
            </ProfileContainer>
          )}
        </Heading>
        <StyledContent isMobile={isMobile}>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
