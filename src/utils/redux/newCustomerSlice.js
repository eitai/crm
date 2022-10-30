import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  id: null,
  phone: null,
  email: "",
  date: null,
  employment: "שכיר",
  smoke: "מעשן",
  health: "תקין",
};

export const newCustomerSlice = createSlice({
  name: "newCustomer",
  initialState: { value: initialState },
  reducers: {},
});

export default newCustomerSlice.reducer;
