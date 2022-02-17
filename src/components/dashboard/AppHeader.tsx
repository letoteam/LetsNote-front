import React, { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  headerComponent?: ReactElement;
};

const AppHeader: FC<Props> = ({ title, headerComponent }) => {
  const Header = styled('header')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  }));
  return (
    <Header
      sx={{
        pt: 2,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: '4rem',
        }}
      >
        {title}
      </Typography>

      {headerComponent}
    </Header>
  );
};

export default AppHeader;
