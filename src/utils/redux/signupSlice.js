import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../firebase/firebase";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  uid: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState: { value: initialState },
  reducers: {
    signUpUser: (state, action) => {
      signup(
        action.payload.email,
        action.payload.password,
        action.payload.confirmPassword
      );
    },
  },
});

export const { signUpUser } = signupSlice.actions;
export default signupSlice.reducer;
