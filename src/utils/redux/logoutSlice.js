import { createSlice } from "@reduxjs/toolkit";
import { logOutUser } from "../firebase/firebase";

const initialState = {};

export const logoutSlice = createSlice({
  name: "logout",
  initialState: { value: initialState },
  reducers: {
    logout: (state, action) => {
      logOutUser();
    },
  },
});

export const { logout } = logoutSlice.actions;

export default logoutSlice.reducer;
