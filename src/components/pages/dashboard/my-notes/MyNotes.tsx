import React, { FC, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import DashboardHeader from '../../../application/header/DashboardHeader';
import NotesFeed from '../../../shared/my-notes/notes-feed/NotesFeed';
import NoteEditor from '../../../shared/my-notes/note-editor/NoteEditor';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const MyNotes: FC<Props> = () => {
  const navigate = useNavigate();

  const HeaderComponent = (
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

  return (
    <Box>
      <DashboardHeader title="My Notes" headerComponent={HeaderComponent} />

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <NotesFeed />
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        <NoteEditor />
      </Box>
    </Box>
  );
};

export default MyNotes;
