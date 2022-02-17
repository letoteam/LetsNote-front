import React, { FC } from 'react';
import FormLayout from '../FormLayout';
import LogInForm from './LogInForm';

const LogIn: FC = () => {
  return (
    <FormLayout userHasAccount={true}>
      <LogInForm />
    </FormLayout>
  );
};

export default LogIn;
