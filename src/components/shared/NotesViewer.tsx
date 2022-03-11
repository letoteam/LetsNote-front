import React, { FC } from 'react';
import NotesType from '../../models/NotesType';
import NotesFeed from './my-notes/notes-feed/NotesFeed';
import { Box, Divider } from '@mui/material';
import NoteEditor from './my-notes/note-editor/NoteEditor';

type Props = {
  notesType: NotesType;
};

const NotesViewer: FC<Props> = ({ notesType }) => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <NotesFeed notesType={notesType} />
      <Divider orientation="vertical" variant="fullWidth" flexItem />
      <NoteEditor notesType={notesType} />
    </Box>
  );
};

export default NotesViewer;
