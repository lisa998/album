import { configureStore } from "@reduxjs/toolkit";
import picReducer from "../component/home/picSlice";

export default configureStore({
  reducer: {
    pic: picReducer,
  },
});
