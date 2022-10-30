import React, { useState } from 'react';
import Style from './customerQuestions.module.scss';

const CustomerCommonQuestions = () => {
  const [isQuestionState, setIsQuestionState] = useState(true);
  return (
    <>
      <div className={Style.container}>
        <div className={Style.tabs_container}>
          <div
            className={`${isQuestionState && Style.active_permanent} ${
              Style.tabs
            }`}
            onClick={() => setIsQuestionState(false)}
          >
            <span> שאלות קבועות</span>
          </div>
          <div
            className={`${!isQuestionState && Style.active_changable}  ${
              Style.tabs
            }`}
            onClick={() => setIsQuestionState(true)}
          >
            <span> שאלות משתנות</span>
          </div>
        </div>
        <div className={Style.question_container}>
          {isQuestionState ? (
            <ul className={Style.list}>
              <li> Changable questions </li>

              <li>האם לבטל ביטוח בשביל לחסוך בהוצאות</li>
              <li>האם כדאי להיות מבוטח בביטוח פלטינום של קופ"ח</li>
              <li>בעקבות מחלה לא יכות להתפרנס, מה ניתן לעשות</li>
              <li>בעקבות מחלה לא יכות להתפרנס, מה ניתן לעשות</li>
            </ul>
          ) : (
            <ul className={Style.list}>
              <li> Permanent questions</li>
              <li>האם כדאי להיות מבוטח בביטוח פלטינום של קופ"ח</li>
              <li>בעקבות מחלה לא יכות להתפרנס, מה ניתן לעשות</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerCommonQuestions;
