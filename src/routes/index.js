import React, { lazy } from "react";

import { useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./config";

import DashBoardPage from "@pages/dashboard";
import LoginPage from "@pages/login";
import LayoutPage from "@pages/layout";

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ "@pages/404"));
const Documentation = lazy(() =>
  import(/* webpackChunkName: "404'"*/ "@pages/doucumentation")
);
const Guide = lazy(() =>
  import(/* webpackChunkName: "guide'"*/ "@pages/guide")
);
const RoutePermission = lazy(() =>
  import(/* webpackChunkName: "route-permission"*/ "@pages/permission/route")
);
const ButtonPermission = lazy(() =>
  import(/* webpackChunkName: "button-permission"*/ "@pages/permission/button")
);
const PermissionConfig = lazy(() =>
  import(/* webpackChunkName: "permission-config'"*/ "@pages/permission/config")
);
const AccountPage = lazy(() =>
  import(/* webpackChunkName: "account'"*/ "@pages/account")
);

const routeList = [
  {
    path: "auth",
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    ),
  },
  {
    path: "",
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: "dashboard",
        element: (
          <WrapperRouteComponent
            element={<DashBoardPage />}
            titleId="title.dashboard"
          />
        ),
      },
      {
        path: "documentation",
        element: (
          <WrapperRouteComponent
            element={<Documentation />}
            titleId="title.documentation"
          />
        ),
      },
      {
        path: "guide",
        element: (
          <WrapperRouteComponent element={<Guide />} titleId="title.guide" />
        ),
      },
      {
        path: "permission/route",
        element: (
          <WrapperRouteComponent
            element={<RoutePermission />}
            titleId="title.permission.route"
            auth
          />
        ),
      },
      {
        path: "permission/button",
        element: (
          <WrapperRouteComponent
            element={<ButtonPermission />}
            titleId="title.permission.button"
          />
        ),
      },
      {
        path: "permission/config",
        element: (
          <WrapperRouteComponent
            element={<PermissionConfig />}
            titleId="title.permission.config"
          />
        ),
      },
      {
        path: "account",
        element: (
          <WrapperRouteComponent
            element={<AccountPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: "*",
        element: (
          <WrapperRouteComponent
            element={<NotFound />}
            titleId="title.notFount"
          />
        ),
      },
    ],
  },
];

const RenderRouter = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
