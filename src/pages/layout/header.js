import React from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import HeaderNoticeComponent from "./notice";
import ProfilePic from "@assets/header/profile-pic.jpg";
import { ReactComponent as LanguageSvg } from "@assets/header/language.svg";
import { ReactComponent as FrFrSvg } from "@assets/header/fr_FR.svg";
import { ReactComponent as EnUsSvg } from "@assets/header/en_US.svg";
import ReactSvg from "@assets/logo/react.svg";
import AntdSvg from "@assets/logo/antd.svg";
import { useAppDispatch, useAppState } from "@stores";
import { LocaleFormatter, useLocale } from "@locales";
import { logoutAsync, setUserItem } from "@stores/user.store";

const { Header } = Layout;

const HeaderComponent = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useAppState((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action) => {
    switch (action) {
      case "userInfo":
        return;
      case "userSetting":
        return;
      case "logout":
        const res = Boolean(await dispatch(logoutAsync()));
        res && navigate("/auth");
        return;
    }
  };

  const toLogin = () => {
    navigate("/auth");
  };

  const selectLocale = ({ key }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem("locale", key);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => navigate("/dashboard")}>
            <LocaleFormatter id="header.avator.account" />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick("logout")}>
            <LocaleFormatter id="header.avator.logout" />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="layout-page-header">
      {device !== "MOBILE" && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img
            src={ReactSvg}
            alt=""
            style={{ marginRight: collapsed ? "2px" : "20px" }}
          />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <HeaderNoticeComponent />
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu onClick={selectLocale}>
                <Menu.Item
                  style={{ textAlign: "left" }}
                  disabled={locale === "fr_FR"}
                  key="fr_FR"
                >
                  <FrFrSvg /> Français
                </Menu.Item>
                <Menu.Item
                  style={{ textAlign: "left" }}
                  disabled={locale === "en_US"}
                  key="en_US"
                >
                  <EnUsSvg />
                  English
                </Menu.Item>
              </Menu>
            }
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown>
          {logged ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <span className="user-action">
                <img src={ProfilePic} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: "pointer" }} onClick={toLogin}>
              {formatMessage("global.tips.login")}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
