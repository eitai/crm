import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProductFilter } from "../../utils/redux/customersSlice";
import style from "./productFilter.module.scss";

const initialState = {
  company: null,
  category: null,
  product: null,
};

const ProductFilter = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(initialState);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProducts({ ...products, [name]: value });
  };

  useEffect(() => {
    dispatch(setProductFilter(products));
  }, [products]);

  return (
    <div className={style.productFilter}>
      <div className={style.box}>
        <label htmlFor="company">חברה</label>
        <select name="company" id="company" onChange={onChange}>
          <option value="">בחר</option>
          <option value="מגדל">מגדל</option>
          <option value="כלל">כלל</option>
          <option value="הראל">הראל</option>
          <option value="איילון">איילון</option>
          <option value="מנורה">מנורה</option>
          <option value="הפניקס">הפניקס</option>
        </select>
      </div>
      <div className={style.box}>
        <label htmlFor="category">קטגוריה</label>
        <select name="category" id="category" onChange={onChange}>
          <option value="">בחר</option>

          <option value="חיים">חיים</option>
          <option value="בריאות">בריאות</option>
        </select>
      </div>
      <div className={style.box}>
        <label htmlFor="product">מוצר</label>
        <select name="product" id="product" onChange={onChange}>
          <option value="">בחר</option>
          <option value="תאונות אישיות">תאונות אישיות</option>
          <option value="ריסק">ריסק</option>
          <option value="ריסק משכנאת">ריסק משכנאת</option>
          <option value="בריאות">בריאות</option>
          <option value="מזור">מזור</option>
          <option value="נספחים">נספחים</option>
          <option value="אכע">אכע</option>
          <option value="סיעוד">סיעוד</option>
          <option value="נכות מתאונה">נכות מתאונה</option>
          <option value="מוות מתאונה">מוות מתאונה</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
