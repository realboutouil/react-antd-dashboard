import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout } from "../api/user.api";
import { getGlobalState } from "../utils/getGloabal";

let _a;
const initialState = Object.assign(Object.assign({}, getGlobalState()), {
  noticeCount: 0,
  locale: localStorage.getItem("locale") || "en_US",
  newUser:
    (_a = JSON.parse(localStorage.getItem("newUser"))) !== null && _a !== void 0
      ? _a
      : true,
  logged: !!localStorage.getItem("t"),
  menuList: [],
  username: localStorage.getItem("username") || "",
  role: localStorage.getItem("username") || "",
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserItem(state, action) {
      const { username } = action.payload;
      if (username !== state.username) {
        localStorage.setItem("username", action.payload.username || "");
      }
      Object.assign(state, action.payload);
    },
  },
});
export const { setUserItem } = userSlice.actions;
export default userSlice.reducer;
export const loginAsync = (payload) => {
  return async (dispatch) => {
    const { result, status } = await apiLogin(payload);
    if (status) {
      localStorage.setItem("t", result.token);
      localStorage.setItem("username", result.username);
      dispatch(
        setUserItem({
          logged: true,
          username: result.username,
        })
      );
      return true;
    }
    return false;
  };
};
export const logoutAsync = () => {
  return async (dispatch) => {
    const { status } = await apiLogout({ token: localStorage.getItem("t") });
    if (status) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        })
      );
      return true;
    }
    return false;
  };
};
