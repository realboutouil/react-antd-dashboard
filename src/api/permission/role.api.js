import { request } from "../request";

/** get role list api */
export const apiGetRoleList = () => request("get", "/permission/role");
