import { interceptor, mock } from "../config";

const roles = [
  {
    name: {
      fr_FR: "访客",
      en_US: "Guest",
    },
    code: "role_guest",
    id: 0,
    status: "enabled",
  },
  {
    name: {
      fr_FR: "管理员",
      en_US: "Admin",
    },
    code: "role_admin",
    id: 1,
    status: "enabled",
  },
];

mock.mock("/permission/role", "get", interceptor(roles));
