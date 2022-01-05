import React, {FC, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import AuthService from "../../../services/AuthService";
import {useNavigate, useParams} from "react-router-dom";

const ResetPassword:FC = () => {
    const resetToken = String(useParams().resetToken);
    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setValidationError] = useState('');
    const [resError, setResponseError] = useState('');

    const handleChange =
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            validatePassword(password);
        };

    const sendResetLink = () => {
        validatePassword(password);

        if(!error){
            AuthService.resetPassword(resetToken, password)
                .then((res)=> console.log(res.data.message))
                .catch((err) => setResponseError(err.response.data.message));
        }
    }
    const validatePassword = (password: string) => {
        if (password === '') setValidationError('The password cannot be empty');
        else if (password.length < 6) setValidationError('Password is too short');
        else if (password.indexOf(' ') !== -1) setValidationError('The password cannot contain a space');
        else setValidationError('');
    }

    return(
        <Box className={"auth-container"}>
            <Typography
                variant="h3"
                component="h1"
                mb="10px"
            >
                Reset Password
            </Typography>

            <Box component={"form"}
                 sx={{
                     display: 'flex',
                     flexDirection: 'column'
                 }}>
                <TextField
                    id="form-password"
                    type="password"
                    value={password}
                    onChange={handleChange()}
                    label="Password"
                    size="small"
                    sx={{mt: '18px'}}
                    error={!!error}
                    onBlur={(event) => validatePassword(event.target.value)}
                    helperText={error}
                />

                <Button variant="contained" sx={{mt: '15px'}} onClick={() => {
                    sendResetLink()
                    navigate('/login');
                }}>Reset</Button>


                <Box sx={{maxWidth: "250px", textAlign: "center", mt:'5px'}}>
                    <Typography
                        variant="body2"
                        component="p"
                        color="error"
                    >
                        {resError}
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default ResetPassword;