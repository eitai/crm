import React from 'react';
import Style from './customerInfo.module.scss';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import { updateCustomerToFireBase } from '../../utils/firebase/firebase';
import { useSelector } from 'react-redux';
import CustomerClientStatus from '../../components/customerClientStatus/CustomerClientStatus';
import CustomerContactInfo from '../../components/customerContactInfo/CustomerContactInfo';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';

const CustomerInfo = () => {
  const { displayedCustomer } = useCustomersStore((state) => state);
  const { fullName, date, id, employment, health, smoke, tz, gender, adress } =
    displayedCustomer;

  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    fullName,
    date,
    id,
    employment,
    health,
    smoke,
    gender,
    adress,
  });

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const ageCalculator = (date) => {
    if (!date) return;
    const newDate = new Date(date.replaceAll('-', ','));
    let diff_ms = Date.now() - newDate.getTime();
    let age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    updateCustomerToFireBase(currentUser, displayedCustomer.id, data);
    setIsEdit(false);
  };

  return (
    <div className={Style.customerInfo}>
      {isEdit ? (
        <form onSubmit={() => handleSubmit(values)}>
          <div className={Style.right_container}>
            <div>
              <TextField
                type='text'
                name='fullName'
                label={'שם מלא'}
                onChange={handleChange}
                fullwidth
              />
            </div>
            <div>
              <TextField
                name='tz'
                className={Style.id}
                label={'תעודת זהות'}
                onChange={handleChange}
                fullwidth
              />
            </div>{' '}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullwidth>
                <DatePicker
                  label='תאריך לידה'
                  value={values.date}
                  onChange={(newValue) => {
                    setValues((prev) => ({ ...prev, date: newValue }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>{' '}
            </div>
          </div>

          <TextField
            type='text'
            className={Style.address}
            label='הזן כתובת'
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel id='demo-simple-select-label'>מין</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={values.gender}
              onChange={handleChange}
            >
              <MenuItem value={'זכר'}>זכר</MenuItem>
              <MenuItem value={'נקבה'}>נקבה</MenuItem>
            </Select>
          </FormControl>

          <div className={Style.inputBox}>
            <select
              id='employment'
              name='employment'
              defaultValue={employment}
              onChange={handleChange}
            >
              <option value='שכיר'>שכיר</option>
              <option value='עצמאי'>עצמאי</option>
            </select>
          </div>
          <div className={Style.inputBox}>
            <select
              id='smoke'
              name='smoke'
              defaultValue={smoke}
              onChange={handleChange}
            >
              <option value='מעשן'>מעשן</option>
              <option value='לא מעשן'>לא מעשן</option>
            </select>
          </div>
          <div className={Style.inputBox}>
            <select
              id='health'
              name='health'
              defaultValue={health}
              onChange={handleChange}
            >
              <option value='תקין'>תקין</option>
              <option value='לא תקין'>לא תקין</option>
            </select>
          </div>
          <AiOutlineCheck
            className={Style.acceptEdit}
            onClick={(e) => handleSubmit(e, values)}
          />
        </form>
      ) : (
        <>
          <div className={Style.header_container}>
            <div>
              <span className={Style.name}>{fullName}</span>
              <CustomerClientStatus />
            </div>
            <div className={Style.details_container}>
              <div>
                <span className={`${Style.id} ${Style.detail_container}`}>
                  <span className={`${Style.border_bottom}`}> תז</span>: {tz}
                </span>
              </div>

              <div className={Style.detail_container}>
                <span>
                  <span className={`${Style.border_bottom}`}>ת.לידה </span>:{' '}
                  <strong>{date}</strong>
                </span>
              </div>
              <div className={Style.detail_container}>
                <span>
                  {' '}
                  <span className={`${Style.border_bottom}`}> גיל</span>:
                  <strong>{ageCalculator(date)}</strong>
                </span>{' '}
              </div>
              <div className={Style.detail_container}>
                <span>
                  {' '}
                  <span className={`${Style.border_bottom}`}>כתובת</span>:
                  <strong>הנביאים 7 טבריה</strong>
                </span>{' '}
              </div>
            </div>
            <div className={Style.details_container}>
              <div className={Style.detail_container}>
                <span>
                  <span className={`${Style.border_bottom}`}>מין</span>:
                  <strong>{gender}</strong>
                </span>
              </div>

              <div className={Style.detail_container}>
                <span>
                  <span className={`${Style.border_bottom}`}> {adress}</span>:
                  <strong>{employment}</strong>
                </span>
              </div>
              <div className={Style.detail_container}>
                <span>
                  <span className={`${Style.border_bottom}`}>סטטוס עישון</span>:
                  <strong>{smoke}</strong>
                </span>
              </div>
              <div className={Style.detail_container}>
                <span>
                  <span className={`${Style.border_bottom}`}> מצב בריאותי</span>
                  :<strong>{health}</strong>
                </span>
              </div>
            </div>
            <div className={Style.details_container}>
              <CustomerContactInfo displayedCustomer={displayedCustomer} />
            </div>
            <div className={Style.details_container}>
              <img
                src={require('../../assets/happyman.webp')}
                alt=''
                className={Style.cover_img}
              />{' '}
            </div>
          </div>
          <AiOutlineEdit
            className={Style.editIcon}
            onClick={() => setIsEdit(true)}
          />
        </>
      )}
    </div>
  );
};

export default CustomerInfo;
