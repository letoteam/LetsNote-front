import React, { FC, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import DashboardHeader from '../../../application/header/DashboardHeader';
import NotesFeed from '../../../shared/my-notes/notes-feed/NotesFeed';
import NoteEditor from '../../../shared/my-notes/note-editor/NoteEditor';
import MyNotesHeaderComponent from '../../../shared/my-notes/MyNotesHeaderComponent';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getNotes, selectNoteById } from '../../../../app/slices/notesSlice';
import { selectUser } from '../../../../app/slices/authSlice';
import { useParams } from 'react-router-dom';
import note from '../../../shared/my-notes/notes-feed/Note';
import NotesViewer from '../../../shared/NotesViewer';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  pageTitle: string;
};

const MyNotes: FC<Props> = ({ pageTitle }) => {
  const noteId = useParams().noteId;
  useEffect(() => {
    document.title = pageTitle;
  });

  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(getNotes());
  }, []);

  return (
    <Box>
      <DashboardHeader
        title="My Notes"
        headerComponent={<MyNotesHeaderComponent />}
      />

      <NotesViewer notesType={'personal'} />
    </Box>
  );
};

export default MyNotes;
