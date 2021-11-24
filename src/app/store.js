import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../component/menu/loginSlice";
import picReducer from "../component/home/picSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    pic: picReducer,
  },
});
