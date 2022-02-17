import React, { FC } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
