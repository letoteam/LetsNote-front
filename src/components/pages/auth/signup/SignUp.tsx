import React, { FC, useEffect } from 'react';

import FormLayout from '../../../application/layout/auth/AuthLayout';
import SignUpForm from './SignUpForm';

type Props = {
  pageTitle: string;
};

const SignUp: FC<Props> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  });

  return (
    <FormLayout userHasAccount={false}>
      <SignUpForm />
    </FormLayout>
  );
};

export default SignUp;
