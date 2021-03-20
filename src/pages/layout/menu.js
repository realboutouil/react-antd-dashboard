import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomIcon } from "./customIcon";
import { useAppDispatch, useAppState } from "@stores";
import { setUserItem } from "@stores/user.store";
import { addTag } from "@stores/tags-view.store";

const { SubMenu, Item } = Menu;

const MenuComponent = ({ menuList }) => {
  const [openKeys, setOpenkeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { collapsed, device, locale } = useAppState((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getTitie = (menu) => {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <CustomIcon type={menu?.icon} />
        <span>{menu.label[locale]}</span>
      </span>
    );
  };

  const onMenuClick = (menu) => {
    if (menu.path === pathname) return;
    const { key, label, path } = menu;
    setSelectedKeys([key]);
    if (device !== "DESKTOP") {
      dispatch(setUserItem({ collapsed: true }));
    }
    dispatch(
      addTag({
        id: key,
        label,
        path,
        closable: true,
      })
    );
    navigate(path);
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenkeys(collapsed ? [] : ["/" + pathname.split("/")[1]]);
  }, [collapsed, pathname]);

  const onOpenChange = (keys) => {
    const key = keys.pop();
    if (key) setOpenkeys([key]);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="layout-page-sider-menu"
    >
      {menuList?.map((menu) =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)}>
            {menu.children.map((child) => (
              <Item key={child.path} onClick={() => onMenuClick(child)}>
                {child.label[locale]}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitie(menu)}
          </Item>
        )
      )}
    </Menu>
  );
};

export default MenuComponent;
