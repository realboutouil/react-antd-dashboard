import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import frFr from "antd/es/locale/fr_FR";
import moment from "moment";
import RenderRouter from "@routes";
import { localeConfig } from "@locales";
import { useAppState } from "@stores";
import "moment/locale/fr";

const App = () => {
  const { locale } = useAppState((state) => state.user);

  useEffect(() => {
    switch (locale) {
      case "en_US":
        moment.locale("en");
        break;
      case "fr_FR":
        moment.locale("fr");
        break;
    }
  }, [locale]);

  const getAntdLocale = () => {
    switch (locale) {
      case "en_US":
        return enUS;
      case "fr_FR":
        return frFr;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider
        locale={locale.split("_")[0]}
        messages={localeConfig[locale]}
      >
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
