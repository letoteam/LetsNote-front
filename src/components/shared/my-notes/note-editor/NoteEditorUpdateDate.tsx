import { Divider, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  updateDate: string | undefined;
};

const UpdateDate: FC<Props> = ({ updateDate }) => {
  let noteDate: string;
  if (updateDate) noteDate = updateDate.split('T')[0];
  else {
    const date = new Date();
    noteDate = `${date.getFullYear()}-${
      date.getMonth() < 10 ? '0' : ''
    }${date.getMonth()}-${date.getDay() < 10 ? '0' : ''}${date.getDay()}`;
  }

  return (
    <Divider variant={'fullWidth'} textAlign={'left'}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.disabled',
          fontSize: '0.7rem',
          mr: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        {noteDate}
      </Typography>
    </Divider>
  );
};

export default UpdateDate;
