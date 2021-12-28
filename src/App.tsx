import React from 'react';
import './assets/app.scss';
import {
    Routes,
    Route
} from "react-router-dom";
import Welcome from './components/welcome/welcome';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';

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
