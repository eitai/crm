import React from 'react';
import style from './customerFiles.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import CustomerFilePopup from '../customerFilePopup/CustomerFilePopup';
import { queryForSubcollectionInCustomer } from '../../utils/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CustomerFile from './customerFile/CustomerFile';

const CurstomerFiles = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const customerId = useSelector((state) => state.customers.currentCustomerId);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    queryForSubcollectionInCustomer(currentUser, customerId, 'files').then(
      (data) => setFiles(data)
    );
  }, []);

  return (
    <div className={style.container}>
      <div className={style.fileList}></div>
      <AiOutlinePlus
        className={style.addFile}
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && <CustomerFilePopup setIsPopupOpen={setIsPopupOpen} />}

      {files &&
        files.map((file) => {
          return <CustomerFile key={file.url} />;
        })}
    </div>
  );
};

export default CurstomerFiles;
