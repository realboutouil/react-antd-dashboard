import { interceptor, mock } from "../config";

mock.mock("/user/auth", "post", (config) => {
  const body = JSON.parse(config?.body);
  return interceptor({
    token: "123abcdefg",
    username: body?.username,
    role: body?.username,
  });
});
