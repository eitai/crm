import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  updateCustomerToFireBase,
  createNewCustomer,
} from '../firebase/firebase';
import produce from 'immer';

const initialState = {
  customersList: null,
  filteredCustomersChange: null,
  productFilter: {
    company: null,
    category: null,
    product: null,
  },
  currentCustomer: null,
  currentCustomerId: null,
  currentFileUrl: null,
  relatedCustomerPopup: false,
};

export const updateCustomerObj = createAsyncThunk(
  'customer/update',
  async (customerObj, thunkAPI) => {
    const currentUser = thunkAPI.getState().currentUser.currentUser;
    const currentCustomerId = thunkAPI.getState().customers.currentCustomerId;
    if (!customerObj) return;
    updateCustomerToFireBase(currentUser, currentCustomerId, customerObj);
    return customerObj;
  }
);

export const customersSlice = createSlice({
  name: 'customers',
  initialState: initialState,
  reducers: {
    setCustomersList: (state, action) => {
      state.customersList = action.payload;
    },
    addNewCustomerToList: (state, action) => {
      state.customersList = produce(state.customersList, (draft) => {
        draft.push(action.payload.values);
      });
      createNewCustomer(action.payload.currentUser, action.payload.values);
    },
    setFilteredCustomersChange: (state, action) => {
      state.filteredCustomersChange = action.payload;
    },
    setProductFilter: (state, action) => {
      state.productFilter.company = action.payload.company;
      state.productFilter.category = action.payload.category;
      state.productFilter.product = action.payload.product;
    },
    setCurrentCustomer: (state, action) => {
      state.currentCustomer = action.payload;
      state.currentCustomerId = action.payload.newid;
    },
    setCurrentFileUrl: (state, action) => {
      state.currentFileUrl = action.payload;
    },
    setRelatedCustomerPopup: (state, action) => {
      state.relatedCustomerPopup = action.payload;
    },
    updateCustomerRedux: (state, action) => {
      updateCustomerToFireBase(
        action.payload.admin,
        action.payload.currentCustomerId,
        action.payload.currentCustomer
      );
      state.currentCustomer = action.payload.currentCustomer;
    },
    addIdToNewCustomer: (state, action) => {
      const newid = action.payload.id;
      const newCustomerList = state?.customersList?.map((el) => {
        if (el.tz !== action.payload.newCustomerData.tz) {
          return el;
        } else {
          const newCustomer = el;
          newCustomer.newid = newid;
          return newCustomer;
        }
      });

      state.customersList = newCustomerList;
    },
  },
  extraReducers: {
    [updateCustomerObj.fulfilled]: (state, { payload }) => {
      state.currentCustomer = payload;
    },
  },
});

export const {
  setCustomersList,
  setFilteredCustomersChange,
  setProductFilter,
  setCurrentCustomer,
  setCurrentFileUrl,
  setRelatedCustomerPopup,
  updateCustomerRedux,
  addNewCustomerToList,
  addIdToNewCustomer,
} = customersSlice.actions;

export default customersSlice.reducer;
