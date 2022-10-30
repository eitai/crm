import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  currentUser: "",
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { value: initialState },

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
