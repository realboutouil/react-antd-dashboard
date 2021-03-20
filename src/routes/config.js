import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./privateRouter";
import { useIntl } from "react-intl";

const WrapperRouteComponent = ({ titleId, auth, ...props }) => {
  const { formatMessage } = useIntl();
  const WitchRoute = auth ? PrivateRoute : Route;
  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }
  return <WitchRoute {...props} />;
};

export default WrapperRouteComponent;
