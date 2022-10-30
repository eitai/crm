import React, { useState } from 'react';
import CustomerList from '../../components/customerList/CustomerList';
import Filter from '../../components/filter/Filter';
import Navbar from '../../components/navbar/Navbar';
import NewCustomer from '../../components/newCustomer/NewCustomer';
import Style from './dashboard.module.scss';

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <div className={` ${Style.dashboard_header}`}>
        <img src={require('../../assets/customerbg.webp')} alt='' />
      </div>
      <div className={`container ${Style.dashboardContainer}`}>
        <div className={Style.dashboard}>
          <Navbar setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />
          <div className={`container ${Style.dashboard_container}`}>
            <div className={Style.filter_container}>
              <Filter />
            </div>
            <div className={Style.customerlist_container}>
              <CustomerList />
            </div>
          </div>
          <div className={`container ${Style.sendMessage_container}`}>
            <div className={Style.sendMessage_box1}>
              שליחת הודעה EMAIL/WHATSAPP
            </div>
            <div className={Style.sendMessage_box2}>
              שליחת הודעה EMAIL/WHATSAPP
            </div>
          </div>
          {isPopupOpen && (
            <NewCustomer
              setIsPopupOpen={setIsPopupOpen}
              isPopupOpen={isPopupOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
