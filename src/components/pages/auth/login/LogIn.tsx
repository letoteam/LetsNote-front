import React, { FC, useEffect } from 'react';
import FormLayout from '../../../application/layout/auth/AuthLayout';
import LogInForm from './LogInForm';

type Props = {
  pageTitle: string;
};

const LogIn: FC<Props> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  });
  return (
    <FormLayout userHasAccount={true}>
      <LogInForm />
    </FormLayout>
  );
};

export default LogIn;
