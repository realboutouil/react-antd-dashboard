import React from "react";
import en_US from "./en-US";
import fr_FR from "./fr-FR";
import { FormattedMessage, useIntl } from "react-intl";

export const localeConfig = {
  fr_FR: fr_FR,
  en_US: en_US,
};

export const LocaleFormatter = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };
  return <FormattedMessage {...notChildProps} id={props.id} />;
};

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage = (id) => _formatMessage({ id });
  return {
    ...rest,
    formatMessage,
  };
};
