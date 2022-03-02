import React, { useEffect } from 'react';
import './assets/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  checkAuth,
  selectUser,
  setUnauthorizedUser,
} from './components/pages/auth/authSlice';
import Welcome from './components/pages/welcome/welcome';
import RequireAuth from './components/application/RequireAuth';
import SignUp from './components/pages/auth/signup/SignUp';
import LogIn from './components/pages/auth/login/LogIn';
import ForgotPassword from './components/pages/auth/recover/ForgotPassword';
import ResetPassword from './components/pages/auth/recover/ResetPassword';
import DashboardLayout from './components/application/layout/dashboard/DashboardLayout';
import MyNotes from './components/pages/dashboard/my-notes/MyNotes';
import Profile from './components/pages/dashboard/profile/Profile';

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token') && user.status === 'idle') {
      dispatch(checkAuth());
    } else {
      dispatch(setUnauthorizedUser());
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password">
          <Route index element={<ForgotPassword />} />
          <Route path="reset-password">
            <Route path=":resetToken" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<MyNotes />} />
            <Route path="note/:noteId" element={<MyNotes />} />
          </Route>

          {/*<Route path="/profile" element={<DashboardLayout />}>*/}
          {/*  <Route index element={<Profile />} />*/}
          {/*</Route>*/}
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>Error 404</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
