import './styles/global-styles.scss';
import './styles/global-variables.scss';
import './styles/css-reset.scss';
import 'react-data-grid/lib/styles.css';

import Home from './pages/home/Home.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard.jsx';
import Customer from './pages/customer/Customer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, getCustomersList } from './utils/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux/es/exports';
import { setCurrentUser } from './utils/redux/currentUserSlice';
import { useState } from 'react';
import { useCustomersStore } from './utils/zustand/customers-list-store';

function App() {
  const dispatch = useDispatch();
  const { setCustomerList } = useCustomersStore((state) => state);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, async (user) => {
      const customerList = await getCustomersList(user);
      setCustomerList(customerList);
      dispatch(setCurrentUser(user));
      setIsLoading(false);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(user?.stsTokenManager.accessToken)
      );
    });
  }, [auth]);

  const RequiredAuth = ({ children }) => {
    if (!isLoading) {
      return currentUser ? children : <Navigate to='home' />;
    }
  };

  return (
    <BrowserRouter>
      <div className={`background-color`}>
        <Routes>
          <Route path='/'>
            <Route path='home' element={<Home />} />
            <Route
              index
              element={
                <RequiredAuth>
                  <Dashboard />
                </RequiredAuth>
              }
            />
            <Route
              path='customer/:id'
              element={
                <RequiredAuth>
                  <Customer />
                </RequiredAuth>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
