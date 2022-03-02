import React, { FC } from 'react';

import FormLayout from '../../../application/layout/auth/AuthLayout';
import SignUpForm from './SignUpForm';

// interface Props {}

const SignUp: FC = () => {
  return (
    <FormLayout userHasAccount={false}>
      <SignUpForm />
    </FormLayout>
  );
};

export default SignUp;
