import React, { useState } from 'react';
import Style from './navbar.module.scss';
import { BsBell, BsPlus } from 'react-icons/bs';
import NewCustomer from '../newCustomer/NewCustomer';
import { logout } from '../../utils/redux/logoutSlice.js';
import { useDispatch } from 'react-redux';

const Navbar = ({ setIsPopupOpen, isPopupOpen }) => {
  const dispatch = useDispatch();

  return (
    <div className={`container ${Style.navbar}`}>
      <div className={Style.right}>
        <button
          className={`${Style.btn_disconnect} ${Style.button}`}
          onClick={() => dispatch(logout())}
        >
          התנתק
        </button>
        <span className={`${Style.button} ${Style.customer_count_btn}`}>
          סה"כ לקוחות -
          <span className={Style.customer_count_number}> 150 </span>
        </span>

        <button
          className={Style.button}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          הוסף לקוח <BsPlus className={Style.icon} />
        </button>
      </div>
      <div className={Style.notification}>
        <BsBell className={Style.icon} />
        <span className={Style.num}>3</span>
      </div>
    </div>
  );
};

export default Navbar;
