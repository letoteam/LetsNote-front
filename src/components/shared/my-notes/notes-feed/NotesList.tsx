import React, { FC, useEffect } from 'react';
import {
  getNotes,
  selectAllNotes,
  setFilteredNotesByLabel,
} from '../../../pages/dashboard/my-notes/notesSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../pages/auth/authSlice';
import Note from './Note';
import { Typography } from '@mui/material';
import NotesFeedContainer from './NotesFeedContainer';
import { useSearchParams } from 'react-router-dom';

const NotesList: FC = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const label = searchParams.get('label');

  const user = useAppSelector(selectUser);
  const notes = useAppSelector(selectAllNotes);

  useEffect(() => {
    if (user.status === 'authorized' && notes.notesStatus === 'idle') {
      dispatch(getNotes());
    }
  }, [dispatch, notes.notesStatus]);

  useEffect(() => {
    if (label) {
      dispatch(setFilteredNotesByLabel(label));
    }
  }, [label]);

  const Notes = () => {
    if (notes.filteredNotes !== null) {
      if (notes.filteredNotes.length > 0) {
        return (
          <NotesFeedContainer>
            {notes.filteredNotes.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              Nothing was found
            </Typography>
          </NotesFeedContainer>
        );
      }
    } else {
      if (notes.notes.length !== 0) {
        return (
          <NotesFeedContainer>
            {notes.notes.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              You don't have any notes yet
            </Typography>
          </NotesFeedContainer>
        );
      }
    }
  };

  return <Notes />;
};

export default NotesList;
