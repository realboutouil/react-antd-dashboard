import { request } from "./request";

/** 登录接口 */
export const apiLogin = (data) => request("post", "/user/auth", data);

/** 登出接口 */
export const apiLogout = (data) => request("post", "/user/logout", data);
