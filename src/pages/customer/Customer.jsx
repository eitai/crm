import React, { useState, useEffect } from 'react';
import Style from './customer.module.scss';
import data from '../../mockData/clientsData.json';
import {
  BsBell,
  BsPlus,
  BsWhatsapp,
  BsTelephone,
  BsEnvelope,
  BsPeople,
} from 'react-icons/bs';

import RelatedCustomers from '../../components/relatedCustomers/RelatedCustomers';
import CustomerInfo from '../../components/customerInfo/CustomerInfo';
import CustomerNotes from '../../components/customerNotes/CustomerNotes';
import CustomerQuestions from '../../components/customerQuestions/CustomerQuestions';
import CustomerCommonMsgs from '../../components/customerCommonMsgs/CustomerCommonMsgs';
import CurstomerFiles from '../../components/customerFiles/CurstomerFiles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { queryForCustomer } from '../../utils/firebase/firebase';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setCurrentCustomer } from '../../utils/redux/customersSlice';
import CustomerPageHeader from '../../components/customerPageHeader/CustomerPageHeader';

const Customer = () => {
  const dispatch = useDispatch();

  const currentCustomer = useSelector(
    (state) => state.customers.currentCustomer
  );
  const [expandContactInfo, setExpandedContactInfo] = useState(false);
  const [expandedCurstomerFiles, setExpandedCurstomerFiles] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState(false);
  const [expandedCustomerNotes, setExpandedCustomerNotes] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState(false);
  const [expandedCustomerCommonMsgs, setExpandedCustomerCommonMsgs] =
    useState(false);
  const [expandedRelatedCustomers, setExpandedRelatedCustomers] =
    useState(false);

  const adminUser = useSelector((state) => state.currentUser.currentUser);
  const { id: customerId } = useParams();

  useEffect(() => {
    queryForCustomer(adminUser, customerId).then((response) => {
      dispatch(setCurrentCustomer(response));
    });
  }, [customerId]);

  if (!currentCustomer) return;

  return (
    <div className={Style.customer}>
      <div className={Style.tabs}>
        <CustomerPageHeader />
      </div>
      <div className={Style.customerInfo_container}>
        <CustomerInfo currentCustomer={currentCustomer} />
      </div>

      {/* ----------------------------RelatedCustomers----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() => setExpandedRelatedCustomers(!expandedRelatedCustomers)}
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>לקוחות משויכים</span>{' '}
              <BsPeople />
            </span>
            <ExpandMore
              expand={expandedRelatedCustomers}
              onClick={() =>
                setExpandedRelatedCustomers(!expandedRelatedCustomers)
              }
              aria-expanded={expandedRelatedCustomers}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedRelatedCustomers} timeout='auto' unmountOnExit>
          <RelatedCustomers />
        </Collapse>
      </div>
      {/* ----------------------------RelatedCustomers----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() => setExpandedQuestions(!expandedQuestions)}
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>שאלות ללקוח</span>{' '}
              <BsPeople />
            </span>
            <ExpandMore
              expand={expandedQuestions}
              onClick={() => setExpandedQuestions(!expandedQuestions)}
              aria-expanded={expandedQuestions}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedQuestions} timeout='auto' unmountOnExit>
          <CustomerQuestions />
        </Collapse>
      </div>
      {/* ----------------------------CustomerCommonMsgs----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() =>
            setExpandedCustomerCommonMsgs(!expandedCustomerCommonMsgs)
          }
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>הודעות</span> <BsPeople />
            </span>
            <ExpandMore
              expand={expandedCustomerCommonMsgs}
              onClick={() =>
                setExpandedCustomerCommonMsgs(!expandedCustomerCommonMsgs)
              }
              aria-expanded={expandedCustomerCommonMsgs}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedCustomerCommonMsgs} timeout='auto' unmountOnExit>
          <CustomerCommonMsgs />
        </Collapse>
      </div>
      {/* ----------------------------CurstomerFiles----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() => setExpandedCurstomerFiles(!expandedCurstomerFiles)}
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>קבצים</span> <BsPeople />
            </span>
            <ExpandMore
              expand={expandedCurstomerFiles}
              onClick={() => setExpandedCurstomerFiles(!expandedCurstomerFiles)}
              aria-expanded={expandedCurstomerFiles}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedCurstomerFiles} timeout='auto' unmountOnExit>
          <CurstomerFiles />
        </Collapse>
      </div>
      {/* ----------------------------CurstomerFiles----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() => setExpandedProducts(!expandedProducts)}
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>מוצרים</span> <BsPeople />
            </span>
            <ExpandMore
              expand={expandedProducts}
              onClick={() => setExpandedProducts(!expandedProducts)}
              aria-expanded={expandedProducts}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedProducts} timeout='auto' unmountOnExit>
          <span>מוצרים</span>
        </Collapse>
      </div>
      {/* ----------------------------CustomerNotes----------------------- */}
      <div className={Style.section_container}>
        <div
          className={Style.collapse_bar}
          onClick={() => setExpandedCustomerNotes(!expandedCustomerNotes)}
        >
          <CardActions disableSpacing>
            <span className={Style.section_title_container}>
              <span className={Style.section_title}>הערות</span> <BsPeople />
            </span>
            <ExpandMore
              expand={expandedCustomerNotes}
              onClick={() => setExpandedCustomerNotes(!expandedCustomerNotes)}
              aria-expanded={expandedCustomerNotes}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expandedCustomerNotes} timeout='auto' unmountOnExit>
          <CustomerNotes />
        </Collapse>
      </div>
    </div>
  );
};

export default Customer;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
