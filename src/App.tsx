import React, { useEffect } from 'react';
import './assets/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  checkAuth,
  selectUser,
  setUnauthorizedUser,
} from './components/auth/authSlice';
import Welcome from './components/welcome/welcome';
import RequireAuth from './components/RequireAuth';
import SignUp from './components/auth/signup/SignUp';
import LogIn from './components/auth/login/LogIn';
import ForgotPassword from './components/auth/recover/ForgotPassword';
import ResetPassword from './components/auth/recover/ResetPassword';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/my-notes/Dashboard';

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
            <Route index element={<Dashboard />} />
            <Route path="note/:noteId" element={<Dashboard />} />
          </Route>

          <Route path="/profile" element={<DashboardLayout />}>
            {/*<Route index element={<Profile/>}/>*/}
          </Route>
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
