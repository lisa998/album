import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const submit = createAsyncThunk(
  "users/submit",
  async (user, thunkAPI) => {
    const response = await axios.post("http://localhost:3001/handleLogin", {
      ...user,
    });
    return response.data;
  }
);

export const slice = createSlice({
  name: "login",
  initialState: {
    account: "",
    psw: "",
  },
  reducers: {
    changeAccount: (state, action) => {
      state.account = action.payload;
    },
    changePsw: (state, action) => {
      state.psw = action.payload;
    },
  },
});

export const { changeAccount, changePsw } = slice.actions;

export const selectValue = (state) => state.login;

export default slice.reducer;
