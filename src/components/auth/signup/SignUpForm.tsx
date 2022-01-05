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
    Typography,
    FormHelperText,
    // FormHelperText
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';
import AuthService from "../../../services/AuthService";
import {useNavigate} from "react-router-dom";

interface State {
    email: string;
    name: string;
    password: string;
    showPassword?: boolean;
}

const SignUpForm : FC = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState<State>({
        email: '',
        name: '',
        password: '',
        showPassword: false,
    });
    const [errors, setErrors] = useState<State>({
        email: '',
        name: '',
        password: ''
    });
    const [requestError, setRequestError] = useState('');

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
            validateField(prop);
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

    const validateField = (prop: string) => {
        switch (prop){
            case 'name':
                console.log(errors);
                if(values[prop] === '') setErrors({...errors, name: 'The name cannot be empty'});
                else if(values[prop].indexOf(' ') !== -1) setErrors({...errors, name: 'The name cannot contain a space'});
                else if(values[prop].length < 3) setErrors({...errors, name: 'The name is too short'});
                else if(values[prop].length > 20) setErrors({...errors, name: 'The name is too long'});
                else if(values[prop].match(/[^a-z\d]/i)) setErrors({...errors, name: 'Name can only contain numbers and letters'});
                else setErrors({...errors, name: ''});
                console.log(errors);
                break;
            case 'email':
                const re = /\S+@\S+\.\S+/;
                if(values[prop] === '') setErrors({...errors, email: 'Email cannot be empty'});
                else if(!re.test(values[prop])) setErrors({...errors, email: 'Invalid Email'});
                else setErrors({...errors, email: ''})
                break;
            case 'password':
                if(values[prop] === '') setErrors({...errors, password: 'The password cannot be empty'});
                else if(values[prop].length < 6) setErrors({...errors, password: 'Password is too short'});
                else if(values[prop].indexOf(' ') !== -1) setErrors({...errors, password: 'The password cannot contain a space'});
                else if(values[prop].length > 32) setErrors({...errors, password: 'Password is too long'});
                else setErrors({...errors, password: ''});
                break;
        }
    }


    const signUp = () => {
        // TODO: validateField

        if(!errors.name && !errors.email && !errors.password){
            AuthService.signUp(values.name, values.email, values.password)
                .then((res) => {
                    navigate("/login");
                    // console.log(res)
                })
                .catch((err) => {
                    setRequestError(err.response.data.message);
                });
        }
    }


    return(
        <Box
            component="form"
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <TextField
                id="form-name"
                type="name"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={() => validateField('name')}
                label="Name"
                size="small"
                sx={{mt: '18px'}}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                id="form-email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                label="Email"
                size="small"
                sx={{mt: '18px'}}
                error={!!errors.email}
                onBlur={() => validateField('email')}
                helperText={errors.email}
            />
            <FormControl sx={{ mt: '18px'}} variant="outlined" size="small">
                <InputLabel htmlFor="form-password" error={!!errors.password}>Password</InputLabel>
                <OutlinedInput
                    id="form-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={() => validateField('password')}
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
                    error={!!errors.password}
                    aria-describedby="component-error-text"
                />
                <FormHelperText id="component-error-text" error>
                    {errors.password}
                </FormHelperText>

            </FormControl>

            <Box sx={{maxWidth: "250px", textAlign: "center", mt:'5px'}}>
                <Typography
                    variant="body2"
                    component="p"
                    color="error"
                >
                    {requestError}
                </Typography>
            </Box>

            <Button variant="contained" sx={{mt: '15px'}} onClick={() => {signUp()}}>Sign Up</Button>
        </Box>
    )
}

export default SignUpForm;