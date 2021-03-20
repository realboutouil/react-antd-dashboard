import { useRef } from "react";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import "./index.less";
import { useAppDispatch } from "@stores";
import { useLocale } from "@locales";
import { setUserItem } from "@stores/user.store";

export const useGuide = () => {
  const { formatMessage } = useLocale();
  const dispatch = useAppDispatch();

  const driver = useRef(
    new Driver({
      keyboardControl: false,
      allowClose: false,
      overlayClickNext: true,
      closeBtnText: formatMessage("app.guide.driverjs.closeBtnText"),
      prevBtnText: formatMessage("app.guide.driverjs.prevBtnText"),
      nextBtnText: formatMessage("app.guide.driverjs.nextBtnText"),
      doneBtnText: formatMessage("app.guide.driverjs.doneBtnText"),
    })
  );

  const driverStart = () => {
    setTimeout(() => {
      driver.current.defineSteps([
        {
          element: "#sidebar-trigger",
          popover: {
            title: formatMessage("app.guide.driverStep.sidebarTrigger.title"),
            description: formatMessage(
              "app.guide.driverStep.sidebarTrigger.description"
            ),
            position: "bottom",
            offset: 10,
            isFirst: true,
          },
        },
        {
          element: "#notice-center",
          popover: {
            title: formatMessage("app.guide.driverStep.notices.title"),
            description: formatMessage(
              "app.guide.driverStep.notices.description"
            ),
            position: "bottom",
            offset: -160,
          },
        },
        {
          element: "#language-change",
          popover: {
            title: formatMessage("app.guide.driverStep.switchLanguages.title"),
            description: formatMessage(
              "app.guide.driverStep.switchLanguages.description"
            ),
            position: "bottom",
            offset: -170,
          },
        },
        {
          element: "#pageTabs .ant-tabs-nav.ant-tabs-nav-animated",
          popover: {
            title: formatMessage("app.guide.driverStep.pageTabs.title"),
            description: formatMessage(
              "app.guide.driverStep.pageTabs.description"
            ),
            position: "bottom",
            offset: 30,
          },
        },
        {
          element: "#pageTabs-actions svg",
          popover: {
            title: formatMessage("app.guide.driverStep.pageTabsActions.title"),
            description: formatMessage(
              "app.guide.driverStep.pageTabsActions.description"
            ),
            position: "left",
          },
        },
        {
          element: "#switchTheme span",
          popover: {
            title: formatMessage("app.guide.driverStep.switchTheme.title"),
            description: formatMessage(
              "app.guide.driverStep.switchTheme.description"
            ),
            position: "left",
            isLast: true,
          },
        },
      ]);

      localStorage.setItem("newUser", "false");
      dispatch(
        setUserItem({
          newUser: false,
        })
      );
      driver.current.start();
      console.log("guide started");
    }, 1000);
  };

  return {
    driverStart,
  };
};

export default useGuide;
