import React from 'react';
import './assets/app.scss'
import {
    Routes,
    Route
} from "react-router-dom";
import Layout from './components/welcome/layout/layout';
import Welcome from './components/welcome/welcome';
import SignUp from './components/auth/signUp';
import LogIn from './components/auth/login';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
            </Routes>
        </div>
    );
}

export default App;
