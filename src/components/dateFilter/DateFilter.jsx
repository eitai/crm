import React from "react";
import style from "./dateFilter.module.scss";

const DateFilter = () => {
  return (
    <div className={style.dateFilter}>
      <form>
        <select name="months" id="moths">
          <option value="null">בחר חודש</option>
          <option value="january">ינואר</option>
          <option value="february">פברואר</option>
          <option value="march">מרץ</option>
          <option value="april">אפריל</option>
          <option value="may">מאי</option>
          <option value="june">יוני</option>
          <option value="july">יולי</option>
          <option value="august">אוגוסט</option>
          <option value="september">ספטמבר</option>
          <option value="october">אוקטובר</option>
          <option value="november">נובמבר</option>
          <option value="december">דצמבר</option>
        </select>
      </form>
    </div>
  );
};

export default DateFilter;
