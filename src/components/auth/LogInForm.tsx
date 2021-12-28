import React, {FC} from "react";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

const LogInForm : FC = () => {
    const [values, setValues] = React.useState<State>({
        email: '',
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
            <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="form-email">Email</InputLabel>
                <OutlinedInput
                    id="form-email"
                    required
                    type="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    label="Email"
                />
            </FormControl>

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
                />
            </FormControl>

            <Button variant="contained" sx={{mt: '18px'}}>Log In</Button>
        </Box>
    )
}

export default LogInForm;