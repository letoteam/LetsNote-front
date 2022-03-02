import React, { FC } from 'react';
import { Alert } from '@mui/material';

type Props = {
  isActivated: boolean;
};

const ActivationStatusAlert: FC<Props> = ({ isActivated }) => {
  if (!isActivated) {
    return <Alert severity="success">Your account is activated</Alert>;
  } else {
    return <Alert severity="error">Your account is not activated!</Alert>;
  }
};

export default ActivationStatusAlert;
