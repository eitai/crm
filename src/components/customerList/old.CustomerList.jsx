import React from 'react';
import style from './customerList.module.scss';
import SingleCustomer from '../singleCustomer/SingleCustomer';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CustomerList = ({ setIsCustomerOpen }) => {
  const data = useSelector((state) => state?.customers?.customers);

  const filteredCustomersChange = useSelector(
    (state) => state?.customers.filteredCustomersChange
  );

  const productFilter = useSelector((state) => state?.customers?.productFilter);
  const [filteredCustomers, setFilteredCustomers] = useState(null);

  useEffect(() => {
    setFilteredCustomers(data);

    if (filteredCustomersChange) {
      setFilteredCustomers(() => {
        return data.filter((customer) => {
          return customer.fullName.includes(filteredCustomersChange);
        });
      });
    } else if (productFilter) {
      const { company, category, product } = productFilter;
    } else {
      setFilteredCustomers(data);
    }
  }, [filteredCustomersChange, productFilter, data]);

  return (
    <div className={style.customerList}>
      {filteredCustomers &&
        filteredCustomers?.map((customer) => {
          return (
            <SingleCustomer
              // setIsCustomerOpen={setIsCustomerOpen}
              data={customer}
              key={customer.id}
            />
          );
        })}
    </div>
  );
};

export default CustomerList;
