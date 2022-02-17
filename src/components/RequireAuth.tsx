import { useAppDispatch, useAppSelector } from '../app/hooks';
import { checkAuth, selectUser } from './auth/authSlice';
import { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import { Box } from '@mui/material';

export const useAuth = () => {
  // const dispatch = useAppDispatch();
  // dispatch(checkAuth);
  const user = useAppSelector(selectUser);
  return user.status;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const RequireAuth: FC<Props> = () => {
  const authStatus = useAuth();
  const location = useLocation();

  if (authStatus === 'unauthorized') {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (authStatus === 'loading') {
    return (
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return <Outlet />;
};

export default RequireAuth;
