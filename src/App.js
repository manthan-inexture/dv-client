import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cusLogin, loaded, loading, userLogin } from "./redux/actions";

import Loading from './containers/Loading';
import Homepage from "./components/Homepage";

import CusNavbar from "./components/customer/Navbar";
import CusLanding from './components/customer/Landing';
import CusLogin from "./components/customer/Login";
import CusSignup from "./components/customer/Signup";
import CusProfile from "./components/customer/Profile";
import CusDashboard from "./components/customer/Dashboard";
import RegisteredUsers from './components/customer/RegisteredUsers';
import EventRegPage from "./components/customer/EventRegPage";
import CusLogout from "./components/customer/Logout";

import UserNavbar from "./components/user/Navbar";
import UserLanding from './components/user/Landing';
import UserLogin from "./components/user/Login";
import UserSignup from "./components/user/Signup";
import UserProfile from "./components/user/Profile";
import UserDashboard from './components/user/Dashboard';
import UserEvent from './components/user/Event';
import UserLogout from "./components/user/Logout";

import './App.css'
import Status from './components/customer/Status';
import QRScanner from './components/customer/QRScanner';

function App() {
  const isLoggedIn = useSelector(state => state.reducer.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const isCusLoggedIn = async () => {
      try {
        const res = await fetch('/customer/auth', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if (res.status !== 200) {
          // setTimeout(() => dispatch(loaded()), 1500);
          throw new Error(res.error);
        }
        const data = await res.json();
        if (!data) {
          throw new Error('data not found');
        }
        dispatch(cusLogin())
        setTimeout(() => dispatch(loaded()), 1500);
      } catch (error) {
        console.log(error);
        setTimeout(() => dispatch(loaded()), 1500);
      }
    }

    const isUserLoggedIn = async () => {
      try {
        dispatch(loading());
        const res = await fetch('/user/auth', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if (res.status !== 200) {
          throw new Error(res.error);
        }
        const data = await res.json();
        if (!data) {
          throw new Error('data not found');
        }
        dispatch(userLogin())
        setTimeout(() => dispatch(loaded()), 1500);
      } catch (error) {
        console.log(error);
        setTimeout(() => dispatch(loaded()), 1500);
      }
    }
    isCusLoggedIn();
    isUserLoggedIn();
  }, [dispatch])
  return (
    <>
      <Loading loading={isLoggedIn} />
      <div className={`App ${isLoggedIn ? 'opacity-50' : ''}`}>
        <Routes>
          {/* Customer Routes */}
          <Route path="/customer" element={<><CusNavbar /><CusLanding /></>} />
          <Route path="/customer/login" element={<CusLogin />} />
          <Route path="/customer/signup" element={<CusSignup />} />
          <Route path="/customer/profile" element={<><CusNavbar /><CusProfile /></>} />
          {/* <Route path="/contact" element={<Navbar />} />
          <Route path="/about" element={<Navbar />} /> */}
          <Route path="/customer/dashboard" element={<><CusNavbar /><CusDashboard /></>} />
          <Route path='/customer/event/:id' element={<><CusNavbar /><RegisteredUsers /></>} />
          <Route path="/customer/event/register" element={<EventRegPage />} />
          <Route path='/customer/event/:event_id/:user_id' element={<><CusNavbar /><Status /></>} />
          <Route path='/customer/scan' element={<><CusNavbar /><QRScanner /></>} />
          <Route path="/customer/logout" element={<CusLogout />} />

          {/* User Routes */}
          <Route path="/user" element={<><UserNavbar /><UserLanding /></>} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/profile" element={<><UserNavbar /><UserProfile /></>} />
          <Route path="/user/dashboard" element={<><UserNavbar /><UserDashboard /></>} />
          <Route path='/user/event/:id' element={<><UserNavbar /><UserEvent /></>} />
          <Route path="/user/logout" element={<UserLogout />} />

          {/* Common Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path='*' element={<h1 className='text-center'>Page not found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
