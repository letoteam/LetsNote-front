import React from 'react';
import './assets/app.scss';
import {
    Routes,
    Route
} from "react-router-dom";
import Welcome from './components/welcome/welcome';
import SignUp from './components/auth/signup/SignUp';
import LogIn from './components/auth/login/LogIn';

import ForgotPassword from './components/auth/recover/ForgotPassword';
// import RecoverConfirm from './components/auth/recover/RecoverConfirm';
import ResetPassword from './components/auth/recover/ResetPassword';

import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/forgot-password">
                    <Route index element={<ForgotPassword/>}/>
                    {/*<Route path="confirm" element={<RecoverConfirm/>}/>*/}
                    <Route path="reset-password">
                        <Route path=":resetToken" element={<ResetPassword/>}/>
                    </Route>
                </Route>
                <Route path="/app" element={<DashboardLayout/>}/>

                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />

            </Routes>
        </div>
    );
}

export default App;
