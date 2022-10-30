import React from 'react';
import style from './relatedCustomersPopup.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import './relatedCustomersPopup.module.scss';
import {
  setRelatedCustomerPopup,
  updateCustomerRedux,
} from '../../utils/redux/customersSlice';
import { useState } from 'react';
import produce from 'immer';
import { updateCustomerObj } from '../../utils/redux/customersSlice';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';

const RelatedCustomersPopup = ({ setIsPopupOpen }) => {
  const { displayedCustomer, customerList, updateDisplayedCustomer } =
    useCustomersStore((state) => state);

  const dispatch = useDispatch();

  const [relatedCustomers, setRelatedCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  console.log(relatedCustomers);

  const handleCustomerChecked = (newCustomer) => {
    const isCustomerExist = relatedCustomers.some(
      (customer) => customer.id === newCustomer.id
    );

    let updatedList = [...relatedCustomers];
    updatedList.splice(
      relatedCustomers.findIndex((el) => el.id === newCustomer.id),
      1
    );

    setRelatedCustomers(
      !isCustomerExist ? [...relatedCustomers, newCustomer] : updatedList
    );
  };

  const handleClosePopUpOnOutSideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  const handleAddRelatedCustomers = () => {
    const updatedRelatedCustomers = [
      ...displayedCustomer.relatedCustomers,
      ...relatedCustomers,
    ];

    const updatedDisplayedCustomer = produce(displayedCustomer, (draft) => {
      draft.relatedCustomers = updatedRelatedCustomers;
    });

    updateDisplayedCustomer(updatedDisplayedCustomer);
    dispatch(setRelatedCustomerPopup(false));
  };

  return (
    <div
      className={style.relatedCustomersPopup}
      onClick={handleClosePopUpOnOutSideClick}
    >
      <div className={style.container}>
        <input
          type='text'
          className={style.search}
          placeholder='חפש...'
          value={customerName}
          onChange={(e) => setCustomerName(e?.target?.value)}
        />
        <div className={style.list}>
          {customerList.length &&
            customerList
              .filter((customer) => customer?.fullName?.includes(customerName))
              .filter((customer, index) => {
                const { relatedCustomers } = displayedCustomer;
                if (
                  relatedCustomers.find((el) => el.id === customer.id) ||
                  customer.id === displayedCustomer.id
                )
                  return;
                return customer;
              })
              .map((customer, index) => (
                <div className={style.singleCustomer} key={index}>
                  <input
                    type='checkbox'
                    name={customer.fullName}
                    id={index}
                    value={customer.fullName}
                    onChange={() => handleCustomerChecked(customer)}
                  />
                  <label htmlFor={index}>{customer.fullName}</label>
                </div>
              ))}
        </div>
        <div className={style.btn_container}>
          <button className={style.check} onClick={handleAddRelatedCustomers}>
            הוסף
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedCustomersPopup;
