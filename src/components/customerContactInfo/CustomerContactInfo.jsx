import React from 'react';
import style from './customerContactInfo.module.scss';
import { BsWhatsapp, BsTelephone, BsEnvelope } from 'react-icons/bs';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';
const CustomerContactInfo = () => {
  const { displayedCustomer } = useCustomersStore((state) => state);
  const { phone, email } = displayedCustomer;

  return (
    <div className={style.contact}>
      <h3 className={style.subtitles}>פרטי התקשורת</h3>
      <div className={style.phone}>
        <BsWhatsapp className={style.whatsapp} />
        <BsTelephone className={style.phoneIcon} />
        {phone}
      </div>
      <div className={style.email}>
        <BsEnvelope className={style.emailIcon} />
        {email}
      </div>
    </div>
  );
};

export default CustomerContactInfo;
