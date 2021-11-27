import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiUrl } from "../../conn";

export const loadAllPic = createAsyncThunk("pic/loadAllPic", async () => {
  const response = await axios.get(getApiUrl("loadAllPic"));
  return response.data;
});

export const slice = createSlice({
  name: "pic",
  initialState: {
    /* name:[src1,src2]*/
  },
  reducers: {
    addAlbum: (state, action) => {
      let { name, img } = action.payload;
      if (state[name]) {
        state[name].push(img);
      } else {
        state[name] = [];
        state[name].push(img);
      }
    },
    editName: (state, action) => {
      let { oldName, newName } = action.payload;
      state[newName] = [...state[oldName]];
      delete state[oldName];
    },
    addPic: (state, action) => {
      let { name, img } = action.payload;
      state[name].push(img);
    },
    deletePic: (state, action) => {
      let { name, img } = action.payload;
      state[name] = state[name].filter((ele) => ele !== img);
    },
    deleteAlbum: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { addAlbum, editName, addPic, deletePic, deleteAlbum } =
  slice.actions;

export const selectPic = (state) => state.pic;

export default slice.reducer;
