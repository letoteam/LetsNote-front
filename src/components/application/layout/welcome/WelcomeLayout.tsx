import React, { FC } from 'react';
import WelcomeAppBar from '../../header/WelcomeAppBar';

const WelcomeLayout: FC = ({ children }) => {
  return (
    <>
      <WelcomeAppBar />
      <main>{children}</main>
    </>
  );
};

export default WelcomeLayout;
