import React, { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const NotFoundPage: FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        paddingTop: '10vh',
      }}
    >
      <Typography variant={'h1'} sx={{ textAlign: 'center' }}>
        Error 404
      </Typography>
      <Typography variant={'h4'} component={'p'} sx={{ textAlign: 'center' }}>
        Page not found
      </Typography>
      <Link
        onClick={() => navigate(-1)}
        sx={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}
      >
        Go Back
      </Link>
    </Box>
  );
};

export default NotFoundPage;
