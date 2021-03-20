import { request } from "./request";

export const getMenuList = (config = {}) =>
  request("get", "/user/menu", {}, config);

export const getNoticeList = (config = {}) =>
  request("get", "/user/notice", {}, config);
