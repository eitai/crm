import React, { useState } from 'react';
import Style from './relatedCustomer.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import RelatedCustomersPopup from '../relatedCustomersPopup/RelatedCustomersPopup';
import produce from 'immer';
import { updateCustomerObj } from '../../utils/redux/customersSlice';
import { addToCustomerList } from '../../utils/redux/customerListSlice';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';

const CustomerContacts = () => {
  const { displayedCustomer, updateDisplayedCustomer } = useCustomersStore(
    (state) => state
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveRelatedCustomer = (id) => {
    const updatedRelatedCustomers = displayedCustomer.relatedCustomers.filter(
      (el) => el.id !== id
    );
    debugger;
    console.log('updatedRelatedCustomers : ', updatedRelatedCustomers);
    const updatedDisplayedCustomer = produce(displayedCustomer, (draft) => {
      draft.relatedCustomers = updatedRelatedCustomers;
    });

    updateDisplayedCustomer(updatedDisplayedCustomer);
  };

  return (
    <>
      <div className={Style.contacts}>
        <div className={Style.btn_container}>
          <div
            className={Style.btn_add}
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
          >
            <AiOutlinePlus className={Style.add} /> הוסף לקוח מקושר
          </div>
        </div>
        <div className={Style.related_customers_container}>
          {displayedCustomer.relatedCustomers.length > 0 &&
            displayedCustomer.relatedCustomers.map((customer, index) => {
              return (
                <div key={index} className={Style.related_customer}>
                  <button
                    className={Style.remove_btn}
                    onClick={() => handleRemoveRelatedCustomer(customer.newid)}
                  >
                    X
                  </button>
                  <span onClick={() => dispatch(addToCustomerList(customer))}>
                    {customer.fullName}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      {isPopupOpen && <RelatedCustomersPopup setIsPopupOpen={setIsPopupOpen} />}
    </>
  );
};

export default CustomerContacts;
