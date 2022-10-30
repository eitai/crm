import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

const initialState = {
  selectedCustomers: [],
};

export const customersList = createSlice({
  name: 'customersList',
  initialState,
  reducers: {
    addCustomersToList: (state, action) => {
      state.selectedCustomers = action.payload;
    },
    removeCustomersFromList: (state, action) => {},
    addToCustomerList: (state, action) => {
      const updatedCustomersList = state.selectedCustomers;
      if (
        state.selectedCustomers.some((el) => el.newid === action.payload.newid)
      )
        return;
      updatedCustomersList.push(action.payload);
      state.selectedCustomers = updatedCustomersList;
    },
  },
});

export const {
  addCustomersToList,
  removeCustomersFromList,
  addToCustomerList,
} = customersList.actions;

export default customersList.reducer;
