import React, { useEffect } from 'react';
import './assets/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  checkAuth,
  selectUser,
  setUnauthorizedUser,
} from './app/slices/authSlice';
import Welcome from './components/pages/welcome/welcome';
import RequireAuth from './components/application/RequireAuth';
import SignUp from './components/pages/auth/signup/SignUp';
import LogIn from './components/pages/auth/login/LogIn';
import ForgotPassword from './components/pages/auth/recover/ForgotPassword';
import ResetPassword from './components/pages/auth/recover/ResetPassword';
import DashboardLayout from './components/application/layout/dashboard/DashboardLayout';
import MyNotes from './components/pages/dashboard/my-notes/MyNotes';
import Profile from './components/pages/dashboard/profile/Profile';
import PublicNotes from './components/pages/dashboard/public-notes/PublicNotes';
import NotFoundPage from './components/pages/exception/404/NotFoundPage';
import UsersPage from './components/pages/dashboard/users/UsersPage';
import UserNotes from './components/pages/dashboard/users/UserNotes';

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
        <Route
          path="/"
          element={<Welcome pageTitle={'Welcome to MyNotes'} />}
        />
        <Route
          path="/sign-up"
          element={<SignUp pageTitle={'Sign Up - MyNotes'} />}
        />
        <Route
          path="/login"
          element={<LogIn pageTitle={'Log In - MyNotes'} />}
        />
        <Route path="/forgot-password">
          <Route
            index
            element={<ForgotPassword pageTitle={'Forget Password - MyNotes'} />}
          />
          <Route path="reset-password">
            <Route
              path=":resetToken"
              element={<ResetPassword pageTitle={'Reset Password - MyNotes'} />}
            />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<MyNotes pageTitle={'App - MyNotes'} />} />
            <Route
              path="note/:noteId"
              element={<MyNotes pageTitle={'App - MyNotes'} />}
            />
          </Route>

          {/*<Route path="/profile" element={<DashboardLayout />}>*/}
          {/*  <Route index element={<Profile />} />*/}
          {/*</Route>*/}

          <Route path="/app/public-notes" element={<DashboardLayout />}>
            <Route
              index
              element={<PublicNotes pageTitle={'Public Notes - MyNotes'} />}
            />
            <Route
              path=":noteId"
              element={<PublicNotes pageTitle={'Public Notes - MyNotes'} />}
            />
          </Route>

          <Route path="/app/users" element={<DashboardLayout />}>
            <Route
              index
              element={<UsersPage pageTitle={'Users - MyNotes'} />}
            />
            <Route path=":userId" element={<UserNotes />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
