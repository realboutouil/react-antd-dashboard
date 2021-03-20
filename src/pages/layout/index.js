import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Layout } from "antd";
import MenuComponent from "./menu";
import HeaderComponent from "./header";
import TagsView from "./tagView";
import SuspendFallbackLoading from "./suspendFallbackLoading";
import { getMenuList } from "../../api/layout.api";
import { useGuide } from "../guide/useGuide";
import { useAppDispatch, useAppState } from "@stores";
import { getGlobalState } from "../../utils/getGloabal";
import { setUserItem } from "@stores/user.store";
import { setActiveTag } from "@stores/tags-view.store";
import "./index.less";

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage = () => {
  const [menuList, setMenuList] = useState([]);
  const { device, collapsed, newUser } = useAppState((state) => state.user);
  const isMobile = device === "MOBILE";
  const dispatch = useAppDispatch();
  const { driverStart } = useGuide();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      })
    );
  };

  const initMenuListAll = (menu) => {
    const MenuListAll = [];
    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    const { status, result } = await getMenuList();
    if (status) {
      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result),
        })
      );
      dispatch(setActiveTag(result[0].key));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;
      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: "100%" }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={<SuspendFallbackLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
