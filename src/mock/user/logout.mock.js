import { interceptor, mock } from "../config";

mock.mock("/user/logout", "post", interceptor(null));
