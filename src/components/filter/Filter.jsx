import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilteredCustomersChange } from "../../utils/redux/customersSlice";
import DateFilter from "../dateFilter/DateFilter";
import ProductFilter from "../productFilter/ProductFilter";
import style from "./filter.module.scss";

const Filter = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [name, setName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilteredCustomersChange(name));
  }, [name]);

  return (
    <div className={style.filter}>
      <div className={style.date}>
        <DateFilter />
      </div>

      <input
        type="text"
        className={style.nameFilter}
        placeholder="הכנס שם"
        onChange={(e) => {
          return setName(e.target.value);
        }}
      />
      <div className={style.productContainer}>
        <div
          className={style.product}
          onClick={() => {
            setIsProductOpen(!isProductOpen);
          }}
        >
          מוצר
        </div>
        {isProductOpen && <ProductFilter />}
      </div>
      <button>חברה</button>
      <button>משימה</button>
      <button>מסתיים החודש</button>
      <button>שכיר</button>
      <button>סכום</button>
      <button>סטאטוס</button>
    </div>
  );
};

export default Filter;
