import React from 'react';
import './assets/app.scss';
import {
    Routes,
    Route
} from "react-router-dom";
import Welcome from './components/welcome/welcome';
import SignUp from './components/auth/signup/SignUp';
import LogIn from './components/auth/login/LogIn';

import Recover from './components/auth/recover/Recover';
import RecoverConfirm from './components/auth/recover/RecoverConfirm';
import RecoverReset from './components/auth/recover/RecoverReset';

import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/recover">
                    <Route index element={<Recover/>}/>
                    <Route path="confirm" element={<RecoverConfirm/>}/>
                    <Route path="reset-password" element={<RecoverReset/>}/>
                </Route>
                <Route path="/app" element={<DashboardLayout/>}/>
            </Routes>
        </div>
    );
}

export default App;
