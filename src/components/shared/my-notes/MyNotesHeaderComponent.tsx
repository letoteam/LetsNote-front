import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyNotesHeaderComponent = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      size={'large'}
      endIcon={<EditIcon />}
      sx={{ fontWeight: '700' }}
      onClick={() => {
        navigate('/app');
      }}
    >
      New Note
    </Button>
  );
};

export default MyNotesHeaderComponent;
