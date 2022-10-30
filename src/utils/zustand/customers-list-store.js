import create from 'zustand';
import { persist } from 'zustand/middleware';
import {
  updateCustomerToFireBase,
  createNewCustomer,
} from '../firebase/firebase';

export const useCustomersStore = create(
  persist(
    (set, get) => {
      return {
        customerList: [],
        selectedCustomersList: [],
        displayedCustomer: {},
        setCustomerList: (customerList) => {
          set({ customerList: customerList });
        },
        setSelectedCustomersList: (ids) => {
          set({
            selectedCustomersList: ids,
          });
        },
        createNewCustomer: async (currentUser, values) => {
          const { customerList } = get();
          const customerId = await createNewCustomer(currentUser, values);
          const newCustomer = values;
          newCustomer.id = customerId;
          set({ customerList: [...customerList, values] });
        },
        setDisplayedCustomer: (displayedCustomer) => {
          set({ displayedCustomer });
        },
        updateDisplayedCustomer: (updatedDisplayedCustomer) => {
          updateCustomerToFireBase(updatedDisplayedCustomer);
          set({ displayedCustomer: updatedDisplayedCustomer });
        },
      };
    },
    { name: 'CustomersList' }
  )
);
