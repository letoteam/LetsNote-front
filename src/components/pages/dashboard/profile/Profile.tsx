import React, { FC } from 'react';
import { Alert, Box, Button, Divider, Paper, Typography } from '@mui/material';
import DashboardHeader from '../../../application/header/DashboardHeader';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { logout, selectUser } from '../../auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from '@emotion/styled';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const Profile: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  console.log(user);

  const UserDataContainer = styled('form')(({ theme }) => ({
    marginTop: '10px',
  }));

  const ActivationStatusAlert = () => {
    if (user.data.isActivated) {
      return <Alert severity="success">Your account is activated</Alert>;
    } else {
      return (
        <Alert severity="error">
          Your account is not activated! Check your email
        </Alert>
      );
    }
  };

  console.log(user.data.isActivated);

  return (
    <Box>
      <DashboardHeader
        title={'Profile'}
        headerComponent={
          <Button
            size={'large'}
            endIcon={<LogoutIcon />}
            sx={{ fontWeight: '700' }}
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            Log Out
          </Button>
        }
      />
      <ActivationStatusAlert />

      <UserDataContainer>
        <Typography variant={'h6'}>
          Name:
          <Typography component={'span'} variant={'body1'}>
            {user.data.name}
          </Typography>
        </Typography>

        <Divider />

        <Typography variant={'h6'}>
          Email:
          <Typography component={'span'} variant={'body1'}>
            {user.data.email}
          </Typography>
        </Typography>
      </UserDataContainer>
    </Box>
  );
};

export default Profile;
