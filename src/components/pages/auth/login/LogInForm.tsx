import React, { FC, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { login, setError, selectUser } from '../../../../app/slices/authSlice';
import { useAuth } from '../../../application/RequireAuth';

type IFormInput = {
  email: string;
  password: string;
};

const LogInForm: FC = () => {
  const navigate = useNavigate();

  const authStatus = useAuth();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      dispatch(login(data)).then((action) => {
        if (action.payload.status === 200) navigate('/app');
      });
    } catch (e) {
      dispatch(setError(e));
    }
  };
  useEffect(() => {
    if (authStatus === 'authorized') {
      navigate('/app');
    }
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        }}
        render={({ field }) => (
          <TextField
            id="form-email"
            type="email"
            size="small"
            sx={{ mt: '18px' }}
            label="Email"
            error={!!errors.email}
            helperText={
              (errors.email?.type === 'required' &&
                'Email field cannot be empty') ||
              (errors.email?.type === 'pattern' && 'Invalid Email')
            }
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 32,
        }}
        render={({ field }) => (
          <TextField
            id="form-password"
            type="password"
            size="small"
            sx={{ mt: '18px' }}
            label="Password"
            error={!!errors.password}
            helperText={
              (errors.password?.type === 'required' &&
                'Password field cannot be empty') ||
              (errors.password?.type === 'minLength' && 'Incorrect Length') ||
              (errors.password?.type === 'maxLength' && 'Incorrect Length')
            }
            {...field}
          />
        )}
      />

      <Box sx={{ maxWidth: '250px', textAlign: 'center', mt: '5px' }}>
        <Typography variant="body2" component="p" color="error">
          {user.error}
        </Typography>
      </Box>

      <Button variant="contained" sx={{ mt: '15px' }} type="submit">
        Log In
      </Button>

      <Box>
        <Typography
          variant="body2"
          component="p"
          sx={{ textAlign: 'center' }}
          mt={'10px'}
        >
          <Link to={'/forgot-password'}>Forgot Password?</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogInForm;
