import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();

export const useAppState = (selector) => useSelector(selector);

export default store;
