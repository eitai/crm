import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './customerPageHeader.module.scss';
import { setCurrentCustomer } from '../../utils/redux/customersSlice';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';

const CustomerPageHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    displayedCustomer,
    selectedCustomersList,
    customerList,
    setDisplayedCustomer,
  } = useCustomersStore((state) => state);

  const moveToSelectedCustomer = (el) => {
    setDisplayedCustomer(el);
    navigate(`/customer/${el.id}`);
  };

  return (
    <div className={Style.container}>
      {customerList
        .filter((customer) =>
          selectedCustomersList.some(
            (selectedCustomer) => selectedCustomer === customer.id
          )
        )
        .map((el, index) => (
          <button
            key={index}
            onClick={() => moveToSelectedCustomer(el)}
            className={`${Style.btn} ${
              el.id === displayedCustomer.id ? Style.active_tab : ''
            }`}
          >
            {el.fullName}
          </button>
        ))}
    </div>
  );
};

export default CustomerPageHeader;
