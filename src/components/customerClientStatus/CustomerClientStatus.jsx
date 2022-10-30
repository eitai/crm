import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsBell } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { updateCustomerToFireBase } from '../../utils/firebase/firebase';
import style from './customerClientStatus.module.scss';

const CustomerClientStatus = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const currentCustomerId = useSelector(
    (state) => state?.customers?.currentCustomerId
  );

  const currentCustomer = useSelector(
    (state) => state?.customers?.currentCustomer
  );

  // const [status, setStatus] = useState(currentCustomer.status);

  // const onChangeHnadler = (e) => {
  //   setStatus(e.target.value);
  // };

  // useEffect(() => {
  //   updateCustomerToFireBase(currentUser, currentCustomerId, {
  //     status: status,
  //   });
  // }, [status]);

  return (
    <div className={style.clientStatus}>
      <div className={style.box}>
        <BsBell className={style.icon} />
        <span className={style.num}>4</span>
      </div>
      <label htmlFor='status'>סטטוס לקוח:</label>
      <select
        // defaultValue={currentCustomer.status}
        name='status'
        id='status'
        className={style.select}
        // onChange={onChangeHnadler}
      >
        <option value='פעיל'>פעיל</option>
        <option value='מבוטל'>מבוטל</option>
        <option value='ליד'>ליד</option>
      </select>
    </div>
  );
};

export default CustomerClientStatus;
