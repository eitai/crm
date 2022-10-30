import React, { useState } from "react";
import style from "./customerFilePopup.module.scss";
import {
  addCustomerFiles,
  storage,
  updateCustomer,
} from "../../utils/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFileUrl } from "../../utils/redux/customersSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const CustomerFilePopup = ({ setIsPopupOpen }) => {
  const [currentFile, setCurrentFile] = useState("");
  const [note, setNote] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentFileUrl = useSelector((state) => state.customers.currentFileUrl);

  const dispatch = useDispatch();

  const uploadFiles = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          dispatch(setCurrentFileUrl(url))
        );
      }
    );
  };

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const currentCustomerId = useSelector(
    (state) => state?.customers?.currentCustomerId
  );

  const onSubmit = (e) => {
    e.preventDefault();

    let data = { url: currentFileUrl, note: note };

    addCustomerFiles(currentUser, currentCustomerId, data);
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      setCurrentFile(e.dataTransfer.files[0]);
      uploadFiles(currentFile);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      setCurrentFile(e.target.files[0]);
      uploadFiles(currentFile);
    }
  };

  return (
    <form
      className={style.container}
      onSubmit={onSubmit}
      onDragEnter={handleDrag}
    >
      <label
        htmlFor="input"
        className={!dragActive ? style.input_label : style.input_label_active}
      >
        הוסף לכאן קובץ
        <input
          type="file"
          id="input"
          className={style.input}
          onChange={handleChange}
          multiple={false}
        />
        <h3>{progress}%</h3>
      </label>
      {dragActive && (
        <div
          className={style.drag_file_element}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      <div className={style.note}>
        <label htmlFor="note">הוסף הערה</label>
        <input
          type="text"
          className={style.text}
          name="notes"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <button className={style.send}>שלח</button>
      <button className={style.exit} onClick={() => setIsPopupOpen(false)}>
        x
      </button>
    </form>
  );
};

export default CustomerFilePopup;
