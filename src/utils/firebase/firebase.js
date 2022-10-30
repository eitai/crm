import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collectionGroup,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { store } from '../redux/configureStore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { addIdToNewCustomer } from '../redux/customersSlice';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const db = firebase.firestore();
export const auth = getAuth();

export const signup = async (email, password, confirmPassword) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logOutUser = async () => {
  return await signOut(auth)
    .then(console.log('the user logged out'))

    .catch((err) => console.log(err.message));
};

export const createAdminDocumentFromAuth = async (adminAuth) => {
  if (!adminAuth) return;
  const adminDocRef = doc(db, 'admins', adminAuth.uid);

  const { email } = adminAuth;

  try {
    await setDoc(adminDocRef, { email });
  } catch (err) {
    console.log(err);
  }

  return adminDocRef;
};

export const createNewCustomer = async (adminAuth, newCustomerData) => {
  if (!adminAuth) return;
  const { uid } = adminAuth;
  const adminDocRef = doc(db, 'admins', uid);
  const customersColRef = collection(adminDocRef, 'customers');

  try {
    const customerId = await addDoc(customersColRef, newCustomerData).then(
      async (data) => {
        const customerRef = doc(db, 'admins', uid, 'customers', data.id);
        updateDoc(customerRef, { id: data.id });
        return data.id;
      }
    );
    return customerId;
  } catch (err) {
    console.log(err);
  }
};

export const queryForCustomer = async (adminAuth, id) => {
  if (!adminAuth) return;
  const { uid } = adminAuth;

  const docRef = doc(db, 'admins', uid, 'customers', id);

  const customer = (await getDoc(docRef)).data();
  return customer;
};

export const updateCustomerToFireBase = async (updatedDisplayedCustomer) => {
  const { admin: adminId, id: customerId } = updatedDisplayedCustomer;

  const adminDocRef = db.doc(`admins/${adminId}/customers/${customerId}`);
  await updateDoc(adminDocRef, updatedDisplayedCustomer);
};

export const getCustomersList = async (adminAuth) => {
  if (!adminAuth) return;

  const { uid } = adminAuth;
  const customers = [];

  const customersCollectionSnapShot = await getDocs(
    collection(db, `admins/${uid}/customers`)
  );

  customersCollectionSnapShot.forEach((doc) => {
    return customers.push(doc.data());
  });

  return customers;
};

export const queryForSubcollectionInCustomer = async (
  adminAuth,
  currentCustomerId,
  subCollectionName
) => {
  if (!adminAuth) return;

  let data = [];

  const { uid } = adminAuth;

  const collectionSnapShot = await getDocs(
    collection(
      db,
      `admins/${uid}/customers/${currentCustomerId}/${subCollectionName}`
    )
  );

  collectionSnapShot.forEach((doc) => {
    return data.push(doc.data());
  });
  return data;
};

export const getCustomerDataById = async (adminAuth, id) => {};

export const addCustomerFiles = async (adminAuth, currentCustomerId, data) => {
  if (!adminAuth) return;

  const { uid } = adminAuth;

  const customerDocRef = doc(db, 'admins', uid, 'customers', currentCustomerId);
  const filesColRef = collection(customerDocRef, 'files');

  try {
    await addDoc(filesColRef, data);
    console.log('upload succes');
  } catch (err) {
    console.log(err);
  }
};
