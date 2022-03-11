import React, { FC, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { resetPassword } from '../../../../app/slices/authSlice';
import { useAppDispatch } from '../../../../app/hooks';

type Props = {
  pageTitle: string;
};

const ResetPassword: FC<Props> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  });

  const navigate = useNavigate();
  const [resError, setResponseError] = useState('');

  type IFormInput = {
    newPassword: string;
    resetToken: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      resetToken: String(useParams().resetToken),
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data);
      dispatch(resetPassword(data)).then((action) => {
        if (action.payload.status === 200) navigate('/login');
        else {
          setResponseError(action.payload.data.message);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Box className={'auth-container'}>
      <Typography variant="h3" component="h1" mb="10px">
        Reset Password
      </Typography>

      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Controller
          name="newPassword"
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
              error={!!errors.newPassword}
              helperText={
                (errors.newPassword?.type === 'required' &&
                  'Password field cannot be empty') ||
                (errors.newPassword?.type === 'minLength' &&
                  'Incorrect Length') ||
                (errors.newPassword?.type === 'maxLength' && 'Incorrect Length')
              }
              {...field}
            />
          )}
        />

        <Button variant="contained" sx={{ mt: '15px' }} type="submit">
          Reset
        </Button>

        <Box sx={{ maxWidth: '250px', textAlign: 'center', mt: '5px' }}>
          <Typography variant="body2" component="p" color="error">
            {resError}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
