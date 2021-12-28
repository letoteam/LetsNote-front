import React, {FC, useState} from "react";
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    TextField,
    // FormHelperText
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';
import AuthService from "../../services/AuthService";

interface State {
    email: string;
    name: string;
    password: string;
    showPassword: boolean;
}

const SignUpForm : FC = () => {
    const [values, setValues] = useState<State>({
        email: '',
        name: '',
        password: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <Box
            component="form"
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/*<FormControl variant="outlined" size="small" error>*/}
            {/*    <InputLabel htmlFor="form-name">Name</InputLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="form-name"*/}
            {/*        required*/}
            {/*        type="name"*/}
            {/*        onChange={handleChange('name')}*/}
            {/*        label="Name"*/}
            {/*    />*/}
            {/*</FormControl>*/}

            <TextField
                id="form-name"
                type="name"
                value={values.name}
                onChange={handleChange('name')}
                label="Name"
                size="small"
                sx={{mt: '18px'}}
            />

            {/*<FormControl sx={{ mt: '18px'}} variant="outlined" size="small">*/}
            {/*    <InputLabel htmlFor="form-email">Email</InputLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="form-email"*/}
            {/*        required*/}
            {/*        type="email"*/}
            {/*        value={values.email}*/}
            {/*        onChange={handleChange('email')}*/}
            {/*        label="Email"*/}
            {/*    />*/}
            {/*</FormControl>*/}

            <TextField
                id="form-email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                label="Email"
                size="small"
                sx={{mt: '18px'}}
            />

            <FormControl sx={{ mt: '18px'}} variant="outlined" size="small">
                <InputLabel htmlFor="form-password">Password</InputLabel>
                <OutlinedInput
                    id="form-password"
                    required
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    // error
                />
                {/*<FormHelperText error id="accountId-error">*/}
                {/*    {'Wrong Password'}*/}
                {/*</FormHelperText>*/}
            </FormControl>

            <Button variant="contained" sx={{mt: '18px'}} onClick={}>Sign Up</Button>
        </Box>
    )
}

export default SignUpForm;