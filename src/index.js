import React from "react";
import ReactDOM from "react-dom";
import store from "@stores";
import { Provider } from "react-redux";
import App from "./App";
import "./mock";

import "@assets/fonts/EuclidSquare/stylesheet.css";

import "./styles/main.less";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// hmr enable
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept();
}
