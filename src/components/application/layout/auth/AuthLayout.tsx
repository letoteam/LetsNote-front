import React, { FC, ReactChild } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  userHasAccount: boolean;
  children: ReactChild;
};

type Header = 'Sign up' | 'Log in';
type Footer = {
  textMessage: 'Already have an account?' | "Don't have an account?";
  linkMessage: 'Log in' | 'Sign Up';
  linkUrl: '/login' | '/sign-up';
};

const authLayout: FC<Props> = (props: Props) => {
  let header: Header = 'Log in';
  const footer: Footer = {
    textMessage: "Don't have an account?",
    linkMessage: 'Sign Up',
    linkUrl: '/sign-up',
  };

  if (!props.userHasAccount) {
    header = 'Sign up';
    footer.textMessage = 'Already have an account?';
    footer.linkMessage = 'Log in';
    footer.linkUrl = '/login';
  }

  return (
    <Box className="auth-container">
      <Typography variant="h3" component="h1" mb="10px">
        {header}
      </Typography>
      <Box>{props.children}</Box>
      <Box>
        <Typography variant="body2" component="p" mt={'10px'}>
          {footer.textMessage}{' '}
          <Link to={footer.linkUrl}>{footer.linkMessage}</Link>
        </Typography>
      </Box>
    </Box>
  );
};

// TODO: приватные страницы и замена урла логина

export default authLayout;
