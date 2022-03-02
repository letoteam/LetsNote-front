import React, { FC } from 'react';
import FormLayout from '../../../application/layout/auth/AuthLayout';
import LogInForm from './LogInForm';

const LogIn: FC = () => {
  return (
    <FormLayout userHasAccount={true}>
      <LogInForm />
    </FormLayout>
  );
};

export default LogIn;
