import React, { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { signup, setError, selectUser } from '../authSlice';

type IFormInput = {
  name: string;
  email: string;
  password: string;
};

const SignUpForm: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      dispatch(signup(data)).then((action) => {
        if (action.payload.status === 200) navigate('/app');
      });
    } catch (e) {
      dispatch(setError(e));
    }
  };

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
        name="name"
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 20,
        }}
        render={({ field }) => (
          <TextField
            id="form-name"
            type="text"
            label="Name"
            size="small"
            sx={{ mt: '18px' }}
            error={!!errors.name}
            helperText={
              (errors.name?.type === 'required' &&
                'Name field cannot be empty') ||
              (errors.name?.type === 'minLength' && 'Incorrect Length') ||
              (errors.name?.type === 'maxLength' && 'Incorrect Length')
            }
            {...field}
          />
        )}
      />

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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
