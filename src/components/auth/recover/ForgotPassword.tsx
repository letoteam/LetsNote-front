// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import {Link} from "react-router-dom";
//
// const steps = [
//     'Enter your email',
//     'Enter your reset-password key',
//     'Come up with a new password'
// ];
//
// export default function Recover() {
//
//     const [activeStep, setActiveStep] = React.useState(0);
//
//
//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };
//
//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };
//
//     const handleReset = () => {
//         setActiveStep(0);
//     };
//
//     return (
//         <Box className="auth-container" sx={{ width: '100%' }}>
//             <Stepper activeStep={activeStep}>
//                 {steps.map((label, index) => {
//                     const stepProps: { completed?: boolean } = {};
//                     return (
//                         <Step key={label} {...stepProps}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     );
//                 })}
//             </Stepper>
//             {activeStep === steps.length ? (
//                 <React.Fragment>
//                     <Typography sx={{ mt: 3,}} variant="h6" component="span">
//                         Your password has been changed
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         <Link to="/login" style={{textDecoration: 'none'}}><Button onClick={handleReset} variant="contained">Log in</Button></Link>
//                     </Box>
//                 </React.Fragment>
//             ) : (
//                 <React.Fragment>
//                     <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Button
//                             color="inherit"
//                             disabled={activeStep === 0}
//                             onClick={handleBack}
//                             sx={{ mr: 1 }}
//                         >
//                             Back
//                         </Button>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         <Button onClick={handleNext}>
//                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                     </Box>
//                 </React.Fragment>
//             )}
//         </Box>
//     );
// }
import React, {FC, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import AuthService from "../../../services/AuthService";

const ForgotPassword : FC = () => {

    const [email, setEmail] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [error, setValidationError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleChange =
        () => (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
    };

    const sendResetLink = () => {
        if(!error){
            AuthService.sendResetLink(email)
                .then((res)=> {
                    setResponseMsg(res.data.message);
                    if(res.status === 200) setIsDisabled(true);
                })
                .catch((err) => setValidationError(err.data.message));
        }
    }

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        if(email == '') setValidationError('Email cannot be empty');
        else if(!re.test(email)) setValidationError('Invalid Email');
        else setValidationError('');
    }

    return(
        <Box className={"auth-container"}>
            <Typography
                variant="h3"
                component="h1"
                mb="10px"
            >
                Recover Account
            </Typography>

            <Box component={"form"}
                 sx={{
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <TextField
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={handleChange()}
                    label="Email"
                    size="small"
                    sx={{mt: '18px'}}
                    error={!!error}
                    onBlur={(event) => validateEmail(event.target.value)}
                    helperText={error}
                />

                <Button variant="contained" sx={{mt: '15px'}} onClick={() => {sendResetLink()}} disabled={isDisabled}>Send Reset Link</Button>

                <Box sx={{maxWidth: "250px", textAlign: "center", mt:'5px'}}>
                    <Typography
                        variant="body2"
                        component="p"
                        // color="error"
                    >
                        {responseMsg}
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default ForgotPassword;
