import React from 'react';
import style from './customerCommonMsgs.module.scss';
import { BsWhatsapp, BsEnvelope } from 'react-icons/bs';

const CustomerCommonMsgs = () => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li>
          הודעת ברוך הבא
          <div className={style.icons}>
            <BsWhatsapp className={`${style.icon} ${style.whatsapp}`} />
            <BsEnvelope className={style.icon} />
          </div>
        </li>
        <li>
          טפסים לביטוח
          <div className={style.icons}>
            <BsWhatsapp className={`${style.icon} ${style.whatsapp}`} />
            <BsEnvelope className={style.icon} />
          </div>
        </li>
        <li>
          יום הולדת
          <div className={style.icons}>
            <BsWhatsapp className={`${style.icon} ${style.whatsapp}`} />
            <BsEnvelope className={style.icon} />
          </div>
        </li>
        <li>
          הודעת ברוך הבא
          <div className={style.icons}>
            <BsWhatsapp className={`${style.icon} ${style.whatsapp}`} />
            <BsEnvelope className={style.icon} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CustomerCommonMsgs;
