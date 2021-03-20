import { interceptor, mock } from "../config";

const mockMenuList = [
  {
    name: "dashboard",
    label: {
      fr_FR: "首页",
      en_US: "Dashboard",
    },
    icon: "dashboard",
    key: "0",
    path: "/dashboard",
  },
  {
    name: "documentation",
    label: {
      fr_FR: "文档",
      en_US: "Documentation",
    },
    icon: "documentation",
    key: "1",
    path: "/documentation",
  },
  {
    name: "guide",
    label: {
      fr_FR: "引导",
      en_US: "Guide",
    },
    icon: "guide",
    key: "2",
    path: "/guide",
  },
  {
    name: "permission",
    label: {
      fr_FR: "权限",
      en_US: "Permission",
    },
    icon: "permission",
    key: "3",
    path: "/permission",
    children: [
      {
        name: "routePermission",
        label: {
          fr_FR: "路由权限",
          en_US: "Route Permission",
        },
        key: "2-0",
        path: "/permission/route",
      },
      {
        name: "buttonPermission",
        label: {
          fr_FR: "按钮权限",
          en_US: "Button Permission",
        },
        key: "2-1",
        path: "/permission/button",
      },
      {
        name: "permissionConfig",
        label: {
          fr_FR: "权限配置",
          en_US: "Permission Config",
        },
        key: "2-2",
        path: "/permission/config",
      },
      {
        name: "notFound",
        label: {
          fr_FR: "404",
          en_US: "404",
        },
        key: "2-3",
        path: "/permission/404",
      },
    ],
  },
  {
    name: "account",
    label: {
      fr_FR: "个人设置",
      en_US: "Account",
    },
    icon: "account",
    key: "4",
    path: "/account",
  },
];

mock.mock("/user/menu", "get", interceptor(mockMenuList));
