import React, { FC, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import AppHeader from '../AppHeader';
import NotesFeed from './NotesFeed';
import NoteEditor from './NoteEditor';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNoteById } from './notesSlice';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const Dashboard: FC<Props> = () => {
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      <AppHeader title="My Notes" headerComponent={HeaderComponent} />

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

export default Dashboard;
